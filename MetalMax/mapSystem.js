// 地图切换系统 - Metal Max RPG
// 管理多个地图之间的传送和切换

(function () {
    'use strict';

    // 地图数据配置
    window.MapSystem = {
        // 当前地图名称
        currentMap: '拉多镇',
        
        // 所有地图配置
        maps: {
            '拉多镇': {
                key: 'map_rado_town',
                jsonPath: 'https://raw.githubusercontent.com/zltbrm/assets/master/map/%E6%8B%89%E5%A4%9A%E9%95%87.json',
                tilesets: [
                    { name: 'zzjbdt1', key: 'tiles1', image: 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/zzjbdt1.png' },
                    { name: 'zzjbdt2 XII', key: 'tiles2', image: 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/zzjbdt2%20XII.png' },
                    { name: '重-装城镇1', key: 'tiles3', image: 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/%E9%87%8D-%E8%A3%85%E5%9F%8E%E9%95%871.png' }
                ],
                layerName: '图块层 1',
                spawnPoints: {
                    'default': { x: 12 * 32, y: 10 * 32 }, // 默认出生点
                    'from_garage': { x: 20 * 32, y: 15 * 32 } // 从修车店返回的位置（修车店门口）
                },
                // 传送点配置：进入修车店的位置
                portals: [
                    {
                        name: '修车店入口',
                        x: 20, // tile坐标
                        y: 16, // tile坐标
                        width: 2, // 2个tile宽
                        height: 1, // 1个tile高
                        targetMap: '拉多镇-修车店',
                        targetSpawn: 'from_town',
                        message: '进入修车店'
                    }
                ]
            },
            '拉多镇-修车店': {
                key: 'map_garage',
                jsonPath: 'https://raw.githubusercontent.com/zltbrm/assets/master/map/%E6%8B%89%E5%A4%9A%E9%95%87-%E4%BF%AE%E8%BD%A6%E5%BA%97.json',
                tilesets: [
                    { name: 'zzjbdt1', key: 'tiles1', image: 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/zzjbdt1.png' },
                    { name: 'zzjbdt2 XII', key: 'tiles2', image: 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/zzjbdt2%20XII.png' },
                    { name: '重-装城镇1', key: 'tiles3', image: 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/%E9%87%8D-%E8%A3%85%E5%9F%8E%E9%95%871.png' }
                ],
                layerName: '下层', // 修车店地图的图层名称
                spawnPoints: {
                    'default': { x: 8 * 32, y: 10 * 32 }, // 默认出生点
                    'from_town': { x: 8 * 32, y: 11 * 32 } // 从拉多镇进入的位置（门口）
                },
                // 传送点配置：出口返回拉多镇
                portals: [
                    {
                        name: '修车店出口',
                        x: 7, // tile坐标
                        y: 12, // tile坐标（门口位置）
                        width: 3, // 3个tile宽
                        height: 1, // 1个tile高
                        targetMap: '拉多镇',
                        targetSpawn: 'from_garage',
                        message: '返回拉多镇'
                    }
                ]
            }
        },

        // 获取当前地图配置
        getCurrentMapConfig() {
            return this.maps[this.currentMap];
        },

        // 切换地图
        switchToMap(mapName) {
            if (this.maps[mapName]) {
                this.currentMap = mapName;
                console.log(`🗺️ 切换到地图: ${mapName}`);
                return this.maps[mapName];
            } else {
                console.error(`❌ 地图不存在: ${mapName}`);
                return null;
            }
        },

        // 检查位置是否在传送点上
        checkPortal(tileX, tileY) {
            const config = this.getCurrentMapConfig();
            if (!config || !config.portals) return null;

            for (const portal of config.portals) {
                // 检查玩家是否在传送点范围内
                if (tileX >= portal.x && tileX < portal.x + portal.width &&
                    tileY >= portal.y && tileY < portal.y + portal.height) {
                    return portal;
                }
            }
            return null;
        },

        // 获取目标地图的出生点
        getSpawnPoint(mapName, spawnKey) {
            const config = this.maps[mapName];
            if (!config) return null;
            
            const spawn = config.spawnPoints[spawnKey] || config.spawnPoints['default'];
            return spawn;
        }
    };

    console.log('✅ MapSystem 地图系统已初始化');
})();
