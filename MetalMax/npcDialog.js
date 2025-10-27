// ==================== NPC对话系统 ====================
// Metal Max RPG - NPC对话系统模块
// 包含：对话框、AI对话、剧情管理

(function() {
  'use strict';
  
  //  等待DZMM API就绪
  const dzmmReady = new Promise((resolve) => {
    // 检查是否已经存在 window.dzmm
    if (window.dzmm) {
      resolve();
      return;
    }
    
    // 监听 dzmm:ready 消息
    window.addEventListener('message', function handler(event) {
      if (event.data?.type === 'dzmm:ready') {
        window.removeEventListener('message', handler);
        resolve();
      }
    });
    
    // 1秒后放弃等待，使用备用方案
    setTimeout(() => resolve(), 1000);
  });
  
  // 等待Alpine.js加载完成
  document.addEventListener('alpine:init', () => {
    console.log('💬 NPC对话系统初始化...');
    
    // ==================== Alpine Store: npcDialog ====================
    Alpine.store('npcDialog', {
      showDialog: false,
      npcName: '',
      npcGender: '',
      npcStory: null, // 存储NPC的完整剧情设定
      messages: [],
      inputText: '',
      isLoading: false,
      currentNpcKey: '', // 追踪当前对话的NPC

      openDialog(npcName, npcGender, npcStory) {
        console.log('🎮 openDialog 被调用了！', npcName, npcGender);
        const npcKey = `${npcName}_${npcGender}`;
        
        // 如果是同一个NPC，保留历史记录
        if (this.currentNpcKey !== npcKey) {
          this.messages = [];
          this.currentNpcKey = npcKey;
        }
        
        this.npcName = npcName;
        this.npcGender = npcGender;
        this.npcStory = npcStory; // 保存剧情设定
        this.showDialog = true;
        console.log('✅ 对话框状态设置为 true');
        
        // 如果是新对话，添加初始消息（基于角色设定）
        if (this.messages.length === 0) {
          let greeting = `你好啊，我是${npcName}`;
          
          // 根据角色背景定制问候语
          if (npcStory) {
            if (npcName === '艾莉丝') {
              greeting = `欢迎来到拉多镇酒馆，我是${npcName}。要来杯饮料吗？...或者，你是来打听情报的？`;
            } else if (npcName === '杰克') {
              greeting = `${npcName}。需要修战车吗？...还是想听听老兵的建议？`;
            }
          }
          
          this.messages.push({
            role: 'assistant',
            content: greeting
          });
          console.log('💬 添加了初始消息');
        }
      },

      closeDialog() {
        this.showDialog = false;
        this.inputText = '';
      },

      async sendMessage() {
        if (!this.inputText.trim() || this.isLoading) return;

        const userMessage = this.inputText.trim();
        this.messages.push({ role: 'user', content: userMessage });
        this.inputText = '';
        this.isLoading = true;

        // 预先创建一个空的助手消息对象，用于流式更新
        const assistantMessageIndex = this.messages.length;
        this.messages.push({ role: 'assistant', content: '' });

        try {
          // 等待DZMM API就绪
          await dzmmReady;

          // 构建完整的角色设定提示（作为系统消息）
          let systemPrompt = `你是${this.npcName}，${this.npcGender === 'male' ? '男性' : '女性'}，生活在Metal Max世界的拉多镇。`;
          
          // 如果有详细的剧情设定，添加到提示中
          if (this.npcStory) {
            systemPrompt += `

【角色背景】
${this.npcStory.background}

【性格特点】
${this.npcStory.personality}

【对话风格】
${this.npcStory.dialogue}

【世界观设定】
大破坏后的末世，超级计算机诺亚毁灭了人类文明，变异生物和失控机械横行。

【重要提示】
- 用50字以内简短回复
- 保持角色性格一致
- 可以暗示背景故事但不要直接全盘托出
- 用第一人称回应玩家`;
          }

          // 构建发送给API的消息数组
          const allMessages = [];
          
          // 第一条消息始终包含完整的角色设定
          let firstUserContent = `${systemPrompt}\n\n`;
          let hasAddedFirstUser = false;
          
          // 添加对话历史（排除最后一个空的助手消息）
          for (let i = 0; i < this.messages.length - 1; i++) {
            const msg = this.messages[i];
            // 跳过初始的问候语（因为它只是 UI 展示，不是真实对话）
            if (i === 0 && msg.role === 'assistant') {
              continue;
            }
            
            // 将第一条用户消息与角色设定合并
            if (msg.role === 'user' && !hasAddedFirstUser) {
              hasAddedFirstUser = true;
              firstUserContent += `玩家: ${msg.content}`;
              allMessages.push({
                role: 'user',
                content: firstUserContent
              });
            } else {
              allMessages.push({
                role: msg.role,
                content: msg.content
              });
            }
          }

          let hasReceivedContent = false;
          
          // 打印调试信息（查看发送给API的消息）
          console.log('🤖 发送给AI的消息:', JSON.stringify(allMessages, null, 2));
          
          // 调用AI API（使用DZMM API）
          if (window.dzmm) {
            await window.dzmm.completions(
              { 
                model: 'nalang-xl-10', 
                messages: allMessages, 
                maxTokens: 200 
              },
              (newContent, done) => {
                // 流式更新消息内容
                if (newContent) {
                  hasReceivedContent = true;
                  this.messages[assistantMessageIndex].content = newContent;
                }
                // done 只是标记流结束，不需要额外操作
                if (done) {
                  console.log('✅ AI响应完成:', newContent);
                }
              }
            );

            // 如果没有收到任何内容，显示错误信息
            if (!hasReceivedContent) {
              this.messages[assistantMessageIndex].content = '抱歉，我现在有点走神了...';
            }
          } else {
            // 备用：基于角色设定的预设回复
            const fallbackResponses = this.npcStory ? 
              this.getFallbackResponse(userMessage) : 
              ['这是个好问题，让我想想...', '嗯，我觉得你说得很有道理！'];
            
            this.messages[assistantMessageIndex].content = 
              fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
          }
        } catch (error) {
          console.error('AI对话错误:', error);
          // 更新已存在的助手消息为错误提示
          this.messages[assistantMessageIndex].content = '抱歉，我现在有点走神了...';
        } finally {
          this.isLoading = false;
        }
      },

      // 基于NPC设定的备用回复
      getFallbackResponse(userMessage) {
        const msg = userMessage.toLowerCase();
        
        if (this.npcName === '艾莉丝') {
          if (msg.includes('诺亚') || msg.includes('大破坏')) {
            return ['那个...我不太想谈论那段过去', '有些事，知道太多并不好', '...你听说过旧世界的遗迹吗？'];
          }
          if (msg.includes('战车') || msg.includes('改造')) {
            return ['找杰克吧，他是这方面的专家', '镇子外面很危险，一定要准备充足'];
          }
          return ['想喝点什么吗？', '这个镇子还算安全，但外面就不好说了', '你也是猎人吧？小心点，别像那些人一样有去无回'];
        } else if (this.npcName === '杰克') {
          if (msg.includes('诺亚') || msg.includes('机械')) {
            return ['...那些金属怪物夺走了太多', '我的队友...都死在那次任务里', '（触碰义肢）有时候我分不清自己还算不算人'];
          }
          if (msg.includes('战车') || msg.includes('改造')) {
            return ['战车就是命，别让它成为你的棺材', '装甲要均衡，火力要精准，引擎要可靠', '我可以帮你强化，但得付出代价'];
          }
          return ['有事说事', '想修车还是想聊天？', '新人？多准备点弹药，外面不会有人救你'];
        }
        
        return ['真有趣', '嗯...', '还有什么想说的吗？'];
      }
    });
    
    console.log('✅ NPC对话系统初始化完成');
  });
})();
