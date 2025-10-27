// ==================== 游戏菜单系统 ====================
// Metal Max RPG - 游戏菜单模块
// 包含：角色管理、物品系统、菜单UI逻辑

(function() {
  'use strict';
  
  // 等待Alpine.js加载完成
  document.addEventListener('alpine:init', () => {
    console.log('🎯 游戏菜单系统初始化...');
    
    // ==================== Alpine Store: gameMenu ====================
    Alpine.store('gameMenu', {
      showMenu: false,
      activeTab: 'status',
      
      openMenu() {
        console.log('📋 打开菜单');
        this.showMenu = true;
        // 暂停游戏
        if (window.gameScene) {
          window.gameScene.scene.pause();
        }
      },
      
      closeMenu() {
        console.log('📋 关闭菜单');
        this.showMenu = false;
        // 恢复游戏
        if (window.gameScene) {
          window.gameScene.scene.resume();
        }
      }
    });
    
    console.log('✅ Alpine store已注册: gameMenu');

    // ==================== Alpine Data: gameMenu ====================
    Alpine.data('gameMenu', () => ({
      showMenu: false,
      activeTab: 'status',
      
      // 当前选中的角色索引
      currentCharacterIndex: 0,
      currentTankIndex: 0,
      
      // 多个角色数据
      characters: [
        {
          id: 1,
          name: '主角1-猎人',
          level: 5,
          hp: 45,
          maxHp: 50,
          exp: 320,
          maxExp: 500,
          attack: 12,
          defense: 8,
          inTank: false,  // 是否在战车上
          equipment: {
            weapon: '战术步枪',
            armor: '防弹背心',
            boots: '战术靴',
            accessory: '通讯器'
          }
        },
        {
          id: 2,
          name: '主角2-机械师',
          level: 4,
          hp: 38,
          maxHp: 42,
          exp: 180,
          maxExp: 400,
          attack: 10,
          defense: 6,
          inTank: false,
          equipment: {
            weapon: '扳手',
            armor: '工作服',
            boots: '钢头靴',
            accessory: '工具带'
          }
        },
        {
          id: 3,
          name: '主角3-神枪手',
          level: 6,
          hp: 52,
          maxHp: 55,
          exp: 450,
          maxExp: 600,
          attack: 15,
          defense: 7,
          inTank: false,
          equipment: {
            weapon: '狙击步枪',
            armor: '轻型装甲',
            boots: '战术靴',
            accessory: '瞄准镜'
          }
        }
      ],
      
      // 🚗 [战车系统已禁用] 多辆战车数据
      tanks: [],  // 暂时使用空数组
      
        // 🚗 [战车系统已禁用] 兼容旧代码的getter
        get player() {
          return this.characters[this.currentCharacterIndex];
        },
        
        get tank() {  // 🚗 [战车系统已禁用] 返回一个空对象避免错误
          return { 
            owned: false, 
            name: '', 
            hp: 0, 
            maxHp: 0,
            equipment: {
              mainGun: '',
              subGun: '',
              engine: '',
              armor: '',
              chassis: '',
              cUnit: ''
            }
          };
        },      inventory: [
        { id: 1, name: '医疗包', icon: '💊', count: 3, type: 'healing', value: 30 },
        { id: 2, name: '炮弹', icon: '💣', count: 15, type: 'ammo', value: 5 },
        { id: 3, name: '修理工具', icon: '🔧', count: 2, type: 'repair', value: 50 },
        { id: 4, name: '能量饮料', icon: '🥤', count: 5, type: 'boost', value: 20 }
      ],
      
      init() {
        // 监听全局store的状态
        this.$watch('$store.gameMenu.showMenu', value => {
          this.showMenu = value;
        });
      },
      
      // 切换角色
      switchCharacter(index) {
        if (index >= 0 && index < this.characters.length) {
          this.currentCharacterIndex = index;
          console.log(`切换到角色: ${this.characters[index].name}`);
        }
      },
      
      openMenu() {
        this.showMenu = true;
        Alpine.store('gameMenu').openMenu();
      },
      
      closeMenu() {
        this.showMenu = false;
        Alpine.store('gameMenu').closeMenu();
      },
      
      handleEnterKey() {
        if (this.showMenu) {
          // Enter键可以用来确认操作
          console.log('Enter pressed in menu');
        }
      },
      
      useItem(item) {
        if (item.count <= 0) return;
        
        switch(item.type) {
          case 'healing':
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + item.value);
            item.count--;
            alert(`使用了${item.name}，恢复了${item.value}点生命值！`);
            break;
          case 'boost':
            this.player.attack += 2;
            item.count--;
            alert(`使用了${item.name}，攻击力暂时提升！`);
            break;
        }
        
        // 移除数量为0的物品
        if (item.count <= 0) {
          this.inventory = this.inventory.filter(i => i.id !== item.id);
        }
      },
      
      showInvestigateInfo(type) {
        const messages = {
          town: '拉多镇：大破坏后幸存的小镇，有酒馆、修理店和补给站。镇外有变异生物出没，需要小心。',
          quest: '当前任务：\n1. 【主线】调查诺亚基地的异常信号\n2. 【支线】帮助杰克寻找失落的战车部件\n3. 【支线】艾莉丝的请求：寻找失踪的妹妹',
          enemies: '已遭遇敌人：\n🐺 变异野狗 (HP: 30, ATK: 8)\n🤖 巡逻机器人 (HP: 50, ATK: 12)\n🦂 辐射蝎 (HP: 40, ATK: 10)',
          world: '已探索区域：\n✅ 拉多镇（安全区）\n✅ 镇外废墟\n🔒 诺亚前哨站（需要通行证）\n🔒 地下研究所（需要钥匙卡）'
        };
        
        alert(messages[type] || '暂无情报');
      }
    }));
    
    console.log('✅ 游戏菜单系统初始化完成');
  });
})();
