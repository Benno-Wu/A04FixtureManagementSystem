tools:出入库、采购、报修、报废
man:账号管理
info:tools\fix\purchase\discard\schedule信息查看

所有页面以展示表格为形式，人员权限表现为行按钮+Modal交互
左边菜单栏能展示什么取决于info，info查的表中行按钮具体取决于其他权限字段

人员权限:
schedule:出入库（录入+申请）=0000:(出|入)*(录|申)
schedule:出入库=0|1
purchase:终审-初审-申请=000
fix:处理-申请=00
discard:终审-初审-申请=000
man:管理所有-查看自己=00
info:采购-报废-报修-出入-tool=00000

‘所有’在这里表示前后端能提供的所有接口
‘管理’在这里表示CRUD权限
[schedule,purchase,fix,discard,man,info]||all

申请->初审->终审=c-up-up
生产人员-管理-监管-经理-管理员

生产人员：
schedule:0
purchase:000
fix:00
discard:000
man:01
info:01111
管理：
schedule:1
purchase:001
fix:01
discard:001
man:01
info:11111
监管：
schedule:0
purchase:010
fix:10
discard:010
man:01
info:11111
经理：
schedule:0
purchase:100
fix:00
discard:100
man:01
info:11111
管理员：
schedule:0
purchase:000
fix:00
discard:000
man:11
info:11111
