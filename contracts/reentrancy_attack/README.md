重入攻击：
智能合约的fallback函数是一种特殊的函数，它在以下情况下被调用：
合约收到以太币时，没有其他函数可以匹配
合约收到一个不存在的函数调用时
合约作为库被调用时

fallback函数的特点是：
没有名字、没有参数、没有返回值
可以设置为payable，以便接收以太币
执行时只有2300 gas（除非发送者是合约，并且明确指定了更多的gas）
不能访问合约的状态变量（除了在0.6.0及以上版本）


由于攻击获得的token存在合约中，所以要注意写提取的方法

