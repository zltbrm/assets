// ==================== 战斗系统 ====================
// Metal Max RPG - 战斗系统模块
// 包含：回合制战斗、技能、特效、伤害计算

// 等待Alpine.js加载完成
document.addEventListener('alpine:init', () => {
  console.log('⚔️ 战斗系统初始化...');
  
  // ==================== Alpine Data: battleSystem ====================
  Alpine.data('battleSystem', () => ({
      inBattle: false,
      battleEnded: false,
      isProcessing: false,
      selectingTarget: false,
      selectedEnemyIndex: null,
      hoveredEnemyIndex: null,
      
      // 我方队伍数据
      playerParty: [],
      
      // 敌方队伍数据
      enemies: [],
      
      // 回合制系统
      turnOrder: [],        // 行动顺序数组
      currentTurnIndex: 0,  // 当前行动的单位索引
      currentUnit: null,    // 当前行动的单位
      waitingForInput: false, // 是否在等待玩家输入
      selectedAction: null, // 当前选择的行动
      
      // 旧的单一数据（保留兼容性）
      playerHp: 100,
      playerMaxHp: 100,
      playerAtk: 25,
      playerDef: 10,
      
      enemyName: '变异野狗',
      enemySprite: '🐺',
      enemyClass: 'enemy-dog',
      enemyHp: 30,
      enemyMaxHp: 30,
      enemyAtk: 8,
      enemyDef: 3,
      
      battleLog: '野生的变异野狗出现了！',
      
      startBattle(enemyData) {
        console.log('🎮 startBattle 被调用', enemyData);
        console.log('🎮 设置 inBattle = true');
        this.inBattle = true;
        this.battleEnded = false;
        this.selectingTarget = false;
        this.selectedEnemyIndex = null;
        this.waitingForInput = false;
        
        // 从游戏菜单获取所有角色数据
        try {
          const menuElement = document.querySelector('[x-data="gameMenu"]');
          if (menuElement && menuElement._x_dataStack) {
            const menuData = menuElement._x_dataStack[0];
            
            // 复制所有角色到战斗队伍（深拷贝，避免直接修改原数据）
            this.playerParty = menuData.characters.map((char, index) => ({
              name: char.name,
              hp: char.hp,
              maxHp: char.maxHp,
              attack: char.attack,
              defense: char.defense,
              speed: 10 + index * 2, // 预留速度属性，默认10/12/14
              originalIndex: index,
              isPlayer: true,
              defending: false
            }));
            
            console.log('⚔️ 我方队伍:', this.playerParty);
          } else {
            // 默认队伍
            this.playerParty = [
              { name: '主角1', hp: 45, maxHp: 50, attack: 12, defense: 8, speed: 10, originalIndex: 0, isPlayer: true, defending: false },
              { name: '主角2', hp: 38, maxHp: 42, attack: 10, defense: 6, speed: 12, originalIndex: 1, isPlayer: true, defending: false },
              { name: '主角3', hp: 52, maxHp: 55, attack: 15, defense: 7, speed: 14, originalIndex: 2, isPlayer: true, defending: false }
            ];
          }
        } catch (error) {
          console.error('❌ 获取玩家数据失败:', error);
          this.playerParty = [
            { name: '主角1', hp: 45, maxHp: 50, attack: 12, defense: 8, speed: 10, originalIndex: 0, isPlayer: true, defending: false }
          ];
        }
        
        // 设置敌人数据 - 支持单个或多个敌人
        this.enemies = [];
        if (enemyData) {
          // 如果enemyData是数组，说明是多敌人
          if (Array.isArray(enemyData)) {
            this.enemies = enemyData.map((e, index) => ({
              name: e.name || '变异野狗',
              className: e.className || 'enemy-dog',
              hp: e.hp || 30,
              maxHp: e.hp || 30,
              attack: e.atk || 8,
              defense: e.def || 3,
              speed: e.speed || (8 + index * 2), // 预留速度属性，默认8/10/12
              isPlayer: false,
              enemyIndex: index
            }));
          } else {
            // 单个敌人
            this.enemies = [{
              name: enemyData.name || '变异野狗',
              className: enemyData.className || 'enemy-dog',
              hp: enemyData.hp || 30,
              maxHp: enemyData.hp || 30,
              attack: enemyData.atk || 8,
              defense: enemyData.def || 3,
              speed: enemyData.speed || 8,
              isPlayer: false,
              enemyIndex: 0
            }];
            
            // 保持旧数据兼容
            this.enemyName = enemyData.name || '变异野狗';
            this.enemyClass = enemyData.className || 'enemy-dog';
            this.enemyHp = enemyData.hp || 30;
            this.enemyMaxHp = enemyData.hp || 30;
            this.enemyAtk = enemyData.atk || 8;
            this.enemyDef = enemyData.def || 3;
          }
        } else {
          // 默认敌人
          this.enemies = [{
            name: '变异野狗',
            className: 'enemy-dog',
            hp: 30,
            maxHp: 30,
            attack: 8,
            defense: 3,
            speed: 8,
            isPlayer: false,
            enemyIndex: 0
          }];
        }
        
        const enemyNames = this.enemies.map(e => e.name).join('、');
        this.battleLog = `野生的${enemyNames}出现了！`;
        
        // 初始化回合顺序
        this.initializeTurnOrder();
        
        console.log('🎮 战斗数据已设置:', { 
          inBattle: this.inBattle, 
          playerParty: this.playerParty,
          enemies: this.enemies,
          turnOrder: this.turnOrder
        });
        
        // 暂停游戏场景
        if (window.gameScene) {
          window.gameScene.scene.pause();
          console.log('⏸️ 游戏场景已暂停');
        }
        
        // 开始第一回合
        this.nextTurn();
      },
      
      // 初始化回合顺序（按速度排序）
      initializeTurnOrder() {
        // 合并所有存活单位
        const allUnits = [
          ...this.playerParty.filter(p => p.hp > 0),
          ...this.enemies.filter(e => e.hp > 0)
        ];
        
        // 按速度降序排序（速度高的先行动）
        this.turnOrder = allUnits.sort((a, b) => b.speed - a.speed);
        this.currentTurnIndex = 0;
        
        console.log('📋 行动顺序已确定:', this.turnOrder.map(u => `${u.name}(速度${u.speed})`));
      },
      
      // 下一个行动单位
      async nextTurn() {
        if (this.battleEnded) return;
        
        // 检查战斗是否结束
        const allPlayersDead = this.playerParty.every(p => p.hp <= 0);
        const allEnemiesDead = this.enemies.every(e => e.hp <= 0);
        
        if (allPlayersDead) {
          this.defeat();
          return;
        }
        
        if (allEnemiesDead) {
          this.victory();
          return;
        }
        
        // 跳过已死亡的单位
        while (this.currentTurnIndex < this.turnOrder.length) {
          this.currentUnit = this.turnOrder[this.currentTurnIndex];
          
          // 检查当前单位是否存活
          if (this.currentUnit.hp > 0) {
            break;
          }
          
          this.currentTurnIndex++;
        }
        
        // 如果所有单位都行动完毕，重新开始回合
        if (this.currentTurnIndex >= this.turnOrder.length) {
          this.battleLog = '新的回合开始了！';
          await this.sleep(1000);
          this.currentTurnIndex = 0;
          // 清除所有防御状态
          this.playerParty.forEach(p => p.defending = false);
          this.nextTurn();
          return;
        }
        
        // 当前单位行动
        if (this.currentUnit.isPlayer) {
          // 玩家回合 - 等待输入
          this.waitingForInput = true;
          this.isProcessing = false;
          this.battleLog = `${this.currentUnit.name}的回合！选择行动...`;
        } else {
          // 敌人回合 - 自动行动
          this.waitingForInput = false;
          this.isProcessing = true;
          await this.sleep(500);
          await this.enemyAction(this.currentUnit);
        }
      },
      
      // 开始选择攻击目标
      startAttackSelection() {
        if (!this.waitingForInput || this.isProcessing || this.battleEnded) return;
        this.selectingTarget = true;
        this.selectedAction = 'attack';
        this.battleLog = `${this.currentUnit.name} 选择攻击目标...`;
      },
      
      // 选择敌人
      selectEnemy(index) {
        if (!this.selectingTarget) return;
        if (this.enemies[index].hp <= 0) {
          this.battleLog = '这个敌人已经被击败了！';
          return;
        }
        this.selectedEnemyIndex = index;
        this.executeAttack(index);
      },
      
      // 取消目标选择
      cancelTargetSelection() {
        this.selectingTarget = false;
        this.selectedEnemyIndex = null;
        this.selectedAction = null;
        this.battleLog = `${this.currentUnit.name}取消了攻击`;
      },
      
      // 执行攻击
      async executeAttack(targetIndex) {
        if (!this.currentUnit) return;
        
        this.isProcessing = true;
        this.selectingTarget = false;
        this.waitingForInput = false;
        
        // 确保目标有效
        if (targetIndex >= this.enemies.length || this.enemies[targetIndex].hp <= 0) {
          targetIndex = this.enemies.findIndex(e => e.hp > 0);
          if (targetIndex === -1) {
            this.isProcessing = false;
            this.currentTurnIndex++;
            this.nextTurn();
            return;
          }
        }
        
        const target = this.enemies[targetIndex];
        const attacker = this.currentUnit;
        
        // 播放攻击特效
        await this.sleep(200);
        const targetElements = document.querySelectorAll('.enemy-unit');
        if (targetElements[targetIndex]) {
          // 随机选择特效类型
          const effects = ['slash', 'explosion', 'sprite'];
          const randomEffect = effects[Math.floor(Math.random() * effects.length)];
          this.playAttackEffect(targetElements[targetIndex], randomEffect);
        }
        
        await this.sleep(300);
        
        // 计算伤害
        const damage = Math.max(1, attacker.attack - target.defense + Math.floor(Math.random() * 10 - 5));
        target.hp = Math.max(0, target.hp - damage);
        
        // 显示伤害数字
        if (targetElements[targetIndex]) {
          this.showDamageNumber(targetElements[targetIndex], damage);
        }
        
        this.battleLog = `${attacker.name}对${target.name}造成了${damage}点伤害！`;
        this.selectedEnemyIndex = null;
        
        await this.sleep(900);
        
        if (target.hp <= 0) {
          this.battleLog = `${target.name}被击败了！`;
          await this.sleep(1000);
        }
        
        // 当前单位行动结束，下一个
        this.currentTurnIndex++;
        this.nextTurn();
      },
      
      // 防御
      async defend() {
        if (!this.waitingForInput || this.isProcessing || this.battleEnded) return;
        
        this.isProcessing = true;
        this.waitingForInput = false;
        
        this.currentUnit.defending = true;
        this.battleLog = `${this.currentUnit.name}进入了防御姿态！`;
        
        await this.sleep(1000);
        
        // 当前单位行动结束，下一个
        this.currentTurnIndex++;
        this.nextTurn();
      },
      
      // 使用物品
      async useItemInBattle() {
        if (!this.waitingForInput || this.isProcessing || this.battleEnded) return;
        
        // 简化版：直接使用医疗包恢复当前角色
        const menuElement = document.querySelector('[x-data="gameMenu"]');
        const menuData = menuElement && menuElement._x_dataStack ? menuElement._x_dataStack[0] : null;
        const healItem = menuData ? menuData.inventory.find(item => item.type === 'healing' && item.count > 0) : null;
        
        if (healItem && this.currentUnit) {
          this.isProcessing = true;
          this.waitingForInput = false;
          
          const target = this.currentUnit;
          const oldHp = target.hp;
          target.hp = Math.min(target.maxHp, target.hp + healItem.value);
          const healed = target.hp - oldHp;
          healItem.count--;
          
          // 播放治疗特效
          await this.sleep(200);
          const characterElements = document.querySelectorAll('.character-unit');
          const targetIndex = this.playerParty.indexOf(target);
          if (characterElements[targetIndex]) {
            this.playHealEffect(characterElements[targetIndex]);
            this.showDamageNumber(characterElements[targetIndex], healed, true);
          }
          
          this.battleLog = `${target.name}使用了${healItem.name}，恢复了${healed}点HP！`;
          
          await this.sleep(1000);
          
          // 当前单位行动结束，下一个
          this.currentTurnIndex++;
          this.nextTurn();
        } else {
          alert('没有可用的物品！');
        }
      },
      
      // 逃跑
      async flee() {
        if (!this.waitingForInput || this.isProcessing || this.battleEnded) return;
        
        this.isProcessing = true;
        this.waitingForInput = false;
        
        const fleeChance = Math.random();
        if (fleeChance > 0.5) {
          this.battleLog = '成功逃脱了！';
          await this.sleep(1500);
          this.endBattle();
        } else {
          this.battleLog = '逃跑失败！';
          await this.sleep(1000);
          
          // 当前单位行动结束，下一个
          this.currentTurnIndex++;
          this.nextTurn();
        }
      },
      
      // 敌人行动AI
      async enemyAction(enemy) {
        // 随机选择一个存活的我方角色攻击
        const aliveParty = this.playerParty.filter(c => c.hp > 0);
        if (aliveParty.length === 0) {
          this.defeat();
          return;
        }
        
        const targetIndex = Math.floor(Math.random() * aliveParty.length);
        const target = aliveParty[targetIndex];
        
        // 播放攻击特效
        await this.sleep(200);
        const characterElements = document.querySelectorAll('.character-unit');
        const realTargetIndex = this.playerParty.indexOf(target);
        if (characterElements[realTargetIndex]) {
          this.playAttackEffect(characterElements[realTargetIndex], 'explosion');
        }
        
        await this.sleep(300);
        
        const defenseMod = target.defending ? 0.5 : 1;
        const damage = Math.floor((Math.max(1, enemy.attack - target.defense + Math.floor(Math.random() * 6 - 3))) * defenseMod);
        target.hp = Math.max(0, target.hp - damage);
        
        // 显示伤害数字
        if (characterElements[realTargetIndex]) {
          this.showDamageNumber(characterElements[realTargetIndex], damage);
        }
        
        this.battleLog = `${enemy.name}对${target.name}造成了${damage}点伤害！`;
        
        await this.sleep(1200);
        
        if (target.hp <= 0) {
          this.battleLog = `${target.name}被击败了！`;
          await this.sleep(1000);
        }
        
        // 当前单位行动结束，下一个
        this.currentTurnIndex++;
        this.nextTurn();
      },
      
      victory() {
        this.battleEnded = true;
        const expGain = Math.floor(this.enemies.reduce((sum, e) => sum + e.maxHp, 0) * 2);
        const goldGain = Math.floor(this.enemies.reduce((sum, e) => sum + e.maxHp, 0) * 5);
        this.battleLog = `胜利！获得了${expGain}经验值和${goldGain}G！`;
        this.isProcessing = false;
      },
      
      defeat() {
        this.battleEnded = true;
        this.battleLog = '全灭了...队伍失去了意识...';
        this.isProcessing = false;
      },
      
      endBattle() {
        // 保存战斗后的HP到对应的角色
        try {
          const menuElement = document.querySelector('[x-data="gameMenu"]');
          if (menuElement && menuElement._x_dataStack) {
            const menuData = menuElement._x_dataStack[0];
            
            // 将战斗中的HP同步回角色数据
            for (let character of this.playerParty) {
              if (menuData.characters[character.originalIndex]) {
                menuData.characters[character.originalIndex].hp = character.hp;
                console.log(`💾 ${character.name} HP已保存:`, character.hp);
              }
            }
          }
        } catch (error) {
          console.error('❌ 保存HP失败:', error);
        }
        
        this.inBattle = false;
        this.battleEnded = false;
        this.selectingTarget = false;
        this.selectedEnemyIndex = null;
        
        // 恢复游戏场景
        if (window.gameScene) {
          window.gameScene.scene.resume();
        }
      },
      
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      
      // ==================== 战斗特效系统 ====================
      
      // 播放攻击特效
      playAttackEffect(targetElement, effectType = 'slash') {
        if (!targetElement) return;
        
        const rect = targetElement.getBoundingClientRect();
        const battleArea = document.querySelector('.battle-area');
        if (!battleArea) return;
        
        const areaRect = battleArea.getBoundingClientRect();
        
        // 计算相对位置
        const x = rect.left - areaRect.left + rect.width / 2;
        const y = rect.top - areaRect.top + rect.height / 2;
        
        if (effectType === 'slash') {
          // 斩击特效
          const slash = document.createElement('div');
          slash.className = 'slash-effect';
          slash.style.left = `${x - 40}px`;
          slash.style.top = `${y - 40}px`;
          battleArea.appendChild(slash);
          setTimeout(() => slash.remove(), 400);
        } else if (effectType === 'explosion') {
          // 爆炸特效
          const explosion = document.createElement('div');
          explosion.className = 'explosion-effect';
          explosion.style.left = `${x - 30}px`;
          explosion.style.top = `${y - 30}px`;
          explosion.style.background = 'radial-gradient(circle, #ff6600 0%, #ff3300 30%, #ff9900 60%, transparent 100%)';
          battleArea.appendChild(explosion);
          setTimeout(() => explosion.remove(), 600);
        } else if (effectType === 'sprite') {
          // 分帧动画特效（使用特技动画图片）
          const sprite = document.createElement('div');
          sprite.className = 'sprite-animation';
          sprite.style.left = `${x - 50}px`;
          sprite.style.top = `${y - 50}px`;
          sprite.style.width = '100px';
          sprite.style.height = '100px';
          sprite.style.backgroundImage = `url('https://raw.githubusercontent.com/zltbrm/assets/master/%E7%89%B9%E6%8A%80%E5%8A%A8%E7%94%BB/%E6%92%9E%E5%87%BB.png')`;
          sprite.style.animation = 'effectFadeOut 0.8s ease-out forwards';
          battleArea.appendChild(sprite);
          setTimeout(() => sprite.remove(), 800);
        }
        
        // 闪光击中效果
        const flash = document.createElement('div');
        flash.className = 'hit-flash';
        flash.style.left = `${x - 40}px`;
        flash.style.top = `${y - 40}px`;
        flash.style.width = '80px';
        flash.style.height = '80px';
        battleArea.appendChild(flash);
        setTimeout(() => flash.remove(), 300);
        
        // 目标震动
        targetElement.classList.add('hit-shake');
        setTimeout(() => targetElement.classList.remove('hit-shake'), 300);
      },
      
      // 显示伤害数字
      showDamageNumber(targetElement, damage, isHeal = false) {
        if (!targetElement) return;
        
        const rect = targetElement.getBoundingClientRect();
        const battleArea = document.querySelector('.battle-area');
        if (!battleArea) return;
        
        const areaRect = battleArea.getBoundingClientRect();
        
        const x = rect.left - areaRect.left + rect.width / 2;
        const y = rect.top - areaRect.top;
        
        const damageNum = document.createElement('div');
        damageNum.className = `damage-number ${isHeal ? 'heal' : ''}`;
        damageNum.textContent = isHeal ? `+${damage}` : `-${damage}`;
        damageNum.style.left = `${x}px`;
        damageNum.style.top = `${y}px`;
        damageNum.style.transform = 'translateX(-50%)';
        
        battleArea.appendChild(damageNum);
        setTimeout(() => damageNum.remove(), 1000);
      },
      
      // 播放治疗特效
      playHealEffect(targetElement) {
        if (!targetElement) return;
        
        const rect = targetElement.getBoundingClientRect();
        const battleArea = document.querySelector('.battle-area');
        if (!battleArea) return;
        
        const areaRect = battleArea.getBoundingClientRect();
        
        const x = rect.left - areaRect.left + rect.width / 2;
        const y = rect.top - areaRect.top + rect.height / 2;
        
        const heal = document.createElement('div');
        heal.className = 'heal-effect';
        heal.style.left = `${x - 30}px`;
        heal.style.top = `${y - 30}px`;
        
      battleArea.appendChild(heal);
      setTimeout(() => heal.remove(), 1000);
    }
  }));
  
  console.log('✅ 战斗系统初始化完成');
});

// 等待 Alpine.js 完全初始化后再创建全局函数
document.addEventListener('alpine:initialized', () => {
  console.log('🎉 Alpine.js 已完全初始化，注册全局 startBattle 函数');
  
  // 创建全局战斗触发函数（供Phaser调用）
  window.startBattle = function(enemyData) {
    console.log('🌐 window.startBattle 被调用', enemyData);
    const battleSystemElement = document.querySelector('[x-data="battleSystem"]');
    if (battleSystemElement && battleSystemElement._x_dataStack) {
      const component = battleSystemElement._x_dataStack[0];
      if (component && component.startBattle) {
        console.log('✅ 通过全局函数调用 startBattle');
        component.startBattle(enemyData);
      } else {
        console.error('❌ 组件或 startBattle 方法不存在');
      }
    } else {
      console.error('❌ 战斗系统元素未初始化');
    }
  };
  
  console.log('✅ 全局 startBattle 函数已注册');
});