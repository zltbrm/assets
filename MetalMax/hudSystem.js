// ==================== HUD系统 ====================
// Metal Max RPG - HUD显示模块
// 包含：位置显示、金钱、角色状态等HUD元素

(function() {
  'use strict';
  
  // 等待Alpine.js加载完成
  document.addEventListener('alpine:init', () => {
    console.log('📊 HUD系统初始化...');
    
    // ==================== Alpine Data: hudData ====================
    Alpine.data('hudData', () => ({
      location: '拉多镇',
      position: '0, 0',
      gold: 1000,
      
      // 获取角色数据
      get characters() {
        const menuElement = document.querySelector('[x-data="gameMenu"]');
        if (menuElement && menuElement.__x) {
          return menuElement.__x.$data.characters || [];
        }
        return [];
      }
    }));
    
    console.log('✅ HUD系统初始化完成');
  });
})();
