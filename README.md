# A04工夹具管理系统

本系统前后端统一使用[TypeScript](https://www.typescriptlang.org/)，基于[React](https://reactjs.org/) + [NestJS](https://nestjs.com/)开发。

前后端源代码都在这个仓库，切分支查看

## 简述

功能简单讲就是：根据人员权限管理工夹具的全生命周期。

主要有这些流程：采购、出入库、报修、报废

可以往这些方向扩展：采购管理系统的开发接入、生命周期的小功能丰富(点检...)、各类信息的导入导出、人员管理系统的开发接入...

_前端_

界面交给[Ant Design](https://ant.design/index-cn)

api网络请求交给[simplified-fetch](https://github.com/Benno-Wu/SimplifiedFetch)

_后端_

数据库用MySQL和Redis

NestJS的洋葱圈模型上手难度一般, 可以使用cli生成代码，还有很多内置特性可以用但没用上。

### Bugs

本系统的开发带着学习，实验性质，以及后期没花太多精力。

所以有一定的bug，代码也相当潦草，anyscript写得飞起，前后端接口相关对象的类型定义文件也没统一...
