import React, { useReducer } from "react";
// import {UseCallbackComp} from './UseCallbackComp';

 const reducer = (state,action) => { // iki parametre alır action dispatch e giden parametre
	// action nesne olarak geldiğinde action.key olarak switch durumuna bakılır
	switch (action.type) {
		case 'increment':
			return state + 1
			// return state++ şeklinde kullanım ile mutate yapmak doğru değil +1 ile yeni oluşmalı
		case 'decrement':
			return state - 1
		default:
			return state
			// burada state parametresi useReducer dizisinin ilk elemanı:count 
			// 
	}
 }

const App = () => {

	// return (//callback ve memo açıklama dosya içinde
	// 	<div>
	// 		<UseCallbackComp/>
	// 	</div>
	// );

	//************* USEREDUCER KULLANIMI - USESTATE SIMILAR */
	
	// const [count,dispatch] = useReducer(reducer,0) // iki parametresi var - 1:reducer metodu,2:default value / function vs olabilir
	// default değeri object olarak belirtebiliriz. elemanlarına ulaşmak için count yerine state.todos ya da parçalayabilir {todos} ve kullanılır
	const [{todos},dispatch] = useReducer(reducer,{todos:[]}) 
	
	//count için return
	// return (
	// 	<div>
	// 		<div>count : {count}</div>
	// 		{/* <button onClick={()=>dispatch(1)}>increment</button> // bu kullanım yaygın değil object olarak kullanılması daha yaygın
	// 		<button onClick={()=>dispatch(2)}>decrement</button> */}
	// 		<button onClick={()=>dispatch({type: "increment"})}>increment</button>
	// 		<button onClick={()=>dispatch({type: "decrement"})}>decrement</button>
	// 	</div>
	// );
	
	//todo için return
	return (
		<div>
			<input value={todos}/>
		</div>
	);











}

export default App;
