# Fruit Collapse: Bloodline Panic (Stage Progression)

本版本改为“关卡解锁”模式：清屏进入下一关，失败则重开。

## 运行

无需依赖，直接打开：

1. 进入项目目录
2. 打开 `index.html`

如需本地服务器：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## GitHub Pages 部署

本项目已新增 `docs/` 目录作为 Pages 部署目录，包含：

- `docs/index.html`
- `docs/main.js`
- `docs/style.css`
- `docs/.nojekyll`（禁用 Jekyll，按纯静态站点发布）

`docs/index.html` 内资源引用使用相对路径（如 `./main.js`、`./style.css`）。

在 GitHub 仓库设置中将 Pages Source 设置为：

- `Deploy from a branch`
- Branch: `main`（或你的默认分支）
- Folder: `/docs`

发布后访问链接格式：

- `https://<你的GitHub用户名>.github.io/<仓库名>/`

## 表现层优化（本次）

- 图形：水果改为渐变+高光+阴影+描边，血统B有红色标记，老化会变暗并附带轻量斑驳/抖动。
- 高亮目标（`isHighlighted`）：外发光 + 呼吸脉冲。
- `special`：晶体形态 + 倒计时环；`clearReward` 与 `idlePunish` 用不同色调。
- `bomb`：危险外观、悬停/按下放大提示、可选爆炸半径预览环。
- Lv1 惩罚提示：`preWarn` 阴影底座，`marked` 红色闪烁描边 + ⚠。
- 爆炸/连锁：冲击波、粒子、短暂连线光束、轻微震屏/闪屏。

## 音效（WebAudio）

- HUD 新增 `SFX On/Off` 按钮，默认开启。
- 浏览器策略下，音频在第一次用户交互后自动解锁。
- 事件驱动触发：点击成功/失败、分裂、special生成/分裂、special出生爆炸、bomb引爆、惩罚预警/标记、过关、失败。

`AudioManager` 在 [main.js](/Users/iazxc99/Desktop/游戏水果分裂/main.js) 中，统一接口：

- `audio.play(name, intensity=1)`
- `audio.toggle()`
- `audio.ensure()`

后续若替换为采样音频，只需保留上述接口和事件名映射。

表现代码入口（便于二次改造）：

- 渲染主流程：`render()` / `drawItem()` / `drawSpecial()` / `drawBomb()`
- 粒子与冲击波：`spawnBurstParticles()` / `updateParticles()` / `spawnShockwave()` / `drawShockwaves()`
- 表现事件总线：`emitFxEvent(name, payload)`

## 核心规则（保留）

- 大小等级链：Lv6🍉 → Lv5🍈 → Lv4🍎 → Lv3🍊 → Lv2🍇 → Lv1🫐（Lv1不分裂）
- 分裂：LvX 到时后消失并在附近生成 2 个同血统 Lv(X-1)
- 点击限制：只能点击当前场上最小等级（`Target Lv`）
- 血统继承：A/B 子代继承；Mutant 会在分裂时概率变异
- 老化：新鲜/熟透/腐烂影响分裂速度并有抖动与透明度变化

## Stage 模式

- 每关由 `stageConfig` 生成一批初始物品
- 胜利：场上数量为 0（清屏）
- 失败：场上数量 `>= maxItems`（默认100）
- UI 显示：`Stage`、`Target Lv`、`Count`、`Unlocked`、`Restart`

## 解锁顺序（按关）

- Stage1-3: `fruit`
- Stage4: +`grower`
- Stage5: 无新增（仅提升配置压力）
- Stage6: +`timer`
- Stage8: +`mutant`
- Stage10: +`spawner`
- Stage11: +`linked`
- Stage12: +`storm`

## 各 Type 规则（简述）

- `fruit`: 标准分裂链
- `grower`: 不分裂，周期升一级（最多Lv6）
- `timer`: 倒计时结束爆发生成低等级 fruit 后消失
- `mutant`: 与 fruit 类似，分裂时有概率改变血统
- `spawner`: 周期生成中低级 fruit，压力源
- `linked`: 成对生成，需在窗口内连续点击同一对两个成员
- `storm`: 周期扰动全场位移/速度

## Lv1 新机制（本版）

- 玩家点击清除 Lv1（fruit/mutant）会累计计数：
  - 每清掉 `3` 个 Lv1，自动生成 `1` 个 `Special(clearReward)`（可随时点掉）
  - `clearReward` 的自动分裂更慢（独立延迟），并在玩家最近一次成功清除Lv1附近生成
- 当 `Target Lv == 1` 且玩家长时间未清除 Lv1：
  - 先进入预警（暗圈阴影），随后升级为红色标记（红圈 + ⚠）
  - 标记结束时若3个材料仍存在，生成 `2` 个 `Special(idlePunish)`：
    - 其中1个立即分裂成Lv1
    - 另1个按 `idlePunish` 延迟正常等待（可点掉阻止）
  - `idlePunish` 产物在被选3个Lv1中心附近生成
  - 若标记期间玩家点掉其中任意一个，本次惩罚取消

- `Special(clearReward)` 生成瞬间可触发一次范围爆炸（不炸自己，参数可调）
  - 爆炸中心为“随机中心”：优先锁定附近可炸目标再加随机偏移，找不到则在special附近大偏移随机爆

## 调参入口（重点）

全部关键参数在 [main.js](/Users/iazxc99/Desktop/游戏水果分裂/main.js) 顶部：

- `GAME_CONFIG`
- `BASE_SPECIAL_PARAMS`
- `STAGE_CONFIG`（每关）

表现层常用参数（同在 `GAME_CONFIG`）：

- `particleCap` / `particlePoolCap`（粒子上限与对象池上限）
- `enableBombRangePreview`
- `sfxEnabledDefault` / `sfxMasterGain`
- `explosionSfxCooldownSec`

每关可调字段：

- `initialSpawnCount`
- `allowedTypes`（type权重）
- `fruitLevelDistribution`
- `bloodlineBProbability`
- `stageMultiplier`
- `specialTypeParams`

Lv1 机制参数在 [main.js](/Users/iazxc99/Desktop/游戏水果分裂/main.js) 的 `GAME_CONFIG`：

- `lv1ClearThreshold`
- `specialFromClearCount`
- `specialSplitDelayClearRewardSec`
- `specialSplitDelayIdlePunishSec`
- `specialSplitSpawnLv1Count`
- `lv1IdleAutoMergeDelaySec`
- `lv1PreWarnRatio`
- `lv1MarkedDurationSec`
- `specialFromIdleMergeCount`
- `idlePunishInstantSplitSpecialCount`
- `specialSpawnJitterPx`
- `specialSpawnRetry`
- `specialSpawnExplosionEnabled`
- `specialExplosionSearchRadiusPx`
- `specialExplosionCenterJitterPx`
- `specialExplosionFallbackJitterPx`
- `specialSpawnExplosionRadiusPx`
- `specialSpawnExplosionMaxKills`
- `specialSpawnExplosionAffectsTypes`
- `specialSpawnExplosionDoesNotAffectTypes`

分裂与稳定性说明：

- 已修复“场上存在Lv1时Lv6停止分裂”的问题：所有 `level>1` 且可分裂对象都会持续更新 `splitTimer` 并独立倒计时，不依赖当前可点击等级。

本版额外改动：

- 新增暂停功能：HUD 按钮 `Pause/Resume`，快捷键 `P` 或 `Space`；暂停时逻辑完全冻结，仅UI可操作。
- 黑洞刷出已加限制参数（更晚/更少/有冷却）：
  - `blackholeUnlockStage`
  - `blackholeMinSpawnIntervalSec`
  - `blackholeMaxPerStage`
  - `blackholeMaxPerRun`
  - `blackholeSpawnChance`

## 文件

- [index.html](/Users/iazxc99/Desktop/游戏水果分裂/index.html)
- [style.css](/Users/iazxc99/Desktop/游戏水果分裂/style.css)
- [main.js](/Users/iazxc99/Desktop/游戏水果分裂/main.js)
