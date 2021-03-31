import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {

	state = {
		hasError:'' //用于标识子组件是否产生错误
	}

    /**
     * 
     * 注意 ====>> 错误边界无法捕获以下场景中产生的错误：
     * 1、事件处理（了解更多）
     * 2、异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
     * 3、服务端渲染
     * 4、它自身抛出来的错误（并非它的子组件）
     * 
     * */

	//当Parent的子组件出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息； Derived 衍生的；
	static getDerivedStateFromError(error){
		console.log('@@@',error);
		return {hasError:error}
	}

	componentDidCatch(){
		console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
	}

	render() {
		return (
			<div>
				<h2>我是Parent组件</h2>
				{this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
			</div>
		)
	}
}
