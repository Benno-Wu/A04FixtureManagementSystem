# Run

mysql & redis: src\app.module.ts
项目监听端口: src\main.ts

## Note

码字开发顺序是：entities & module->service->utils & onion->controller
其中utils & onion 基本贯穿项目，只是在那一节点耗时突出
具体entity顺序是：user->useless->scheduling->purchase->fix->fixture
每次在外循环中码某一Entity的具体onion时，常有回滚从头改造

存在大量废弃，未使用代码，大部分属于开发过程中选择新实践方式而停用留存

半学习性质的开发过程，所以存有大量实验性代码，没有统一收束形成某类最佳实践。
即整合出大量抽象过、内聚的类\装饰器，稍微看看就知道存在大量重复性逻辑代码
当然，其中也有预设计时没考虑的整合。
一表一路径，一动作一路径的设定还是一类动作一路径，参数区别，更像取舍平衡的问题。

## Bugs

序列化失败：
我们必须返回一个类的实体。如果你返回一个普通的 JavaScript 对象，例如，{user: new UserEntity()},该对象将不会被正常序列化。
