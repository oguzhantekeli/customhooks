import React,{useState,useEffect, useRef, useLayoutEffect} from "react";
import { useForm } from "./useForm";
import { UseeffectTestComponent } from "./UseeffectTestComponent";
import { UseFetch } from "./UseFetch";

const App = () => {

	// *********** TEMEL KULLANIM *********
	// const [count,setCount] = useState(10);
	
	// return (
	// 	<div>
	// 		<button onClick={()=>setCount(count+1)}>+</button>
	// 		{/* iki şekilde de kullanılabilir - alttaki fonksiyon olarak kullanımı */}
	// 		<button onClick={()=>setCount(currentCount=>currentCount+1)}>+</button>
	// 	{count}
	// 	</div>
	// );
	
	// ********* FORM İŞLEMLERİ *********

	// const [email,setEmail] = useState("");
	// const [password,setPassword] = useState("");
	// // form işlemlerinde bu yapı yerine reusable state yapıları kullanmak daha verimli olur
	// return (
	// 	<div>
	// 		<input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
	// 		<input type="password" name="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
	// 	</div>
	// );

	// USEFORM CUSTOM STATE KULLANIMI useform.js
	
	// const [values,handleChange] = useForm({email:'',password:''});
	// // birden fazla form kullanımında birden fazla useform kullanılabilir
	// return (
	// 	<div>
	// 		{/* useform içinde name özelliğine bakarak state güncelleme yapıyor */}
	// 		<input type="email" name="email" value={values.email} onChange={handleChange}/>
	// 		<input type="password" name="password"  value={values.password} onChange={handleChange}/>
	// 	</div>
	// );

	// ****** USEEFFECT KULLANIMI ********
	const [values,handleChange] = useForm({email:'',password:'',firstname:''});
	const [tog,setTog] = useState(true);
	// ilk render olduğunda ve sondaki dizi parametresine girilen state değiştiğinde tetiklenir 
	// cleanup fonksiyonu çalışması için içinde olduğu komponentin render olması gerekli

	// useEffect(()=>{
	// 	console.log('render works');
	// 	return()=>{console.log("clean funcion works");}
	// 	// return ile cleanup function çalışır ve ilgili component unmount olur 
	// },[values.email])
	// 	//buradaki son dizi dependency array - koşul durumunu kontrol eder

	// useEffect(() => {
	// 	const onMouseMove = e => {
	// 		console.log(e.x,e.y);
	// 	} 
	// 	window.addEventListener('mousemove',onMouseMove)
	// 	return () => {
	// 		window.removeEventListener('mousemove',onMouseMove)
	// 	}
	// }, [])		// event ile useeffect kullanımı

	// **************** USELAYOUTEFFECT ************
	// useLayoutEffect hook ile arasındaki fark 
	// ule-> tüm componentler render olmadan önce, jsx ağacı oluşturulduktan sonra
	// ue-> tüm componentler render olduktan sonra çalışır
	// ule dom işlemleri yapılacağı zaman kullanılması doğru olur 
	// ul ile görsel değişiklik olduğunda önce eski sonra yeni hali render olur, bu da flicker yapar

	//custom hook ile FETCH API - useeffect kullanımı = UseFetch.js

	// const [count,setCount] = useState(0); //alt satırdakinin basit kullanımı 
	const [count,setCount] = useState( () => 
		JSON.parse(localStorage.getItem('count'))
	);
	const { data, loading }=UseFetch(`http://numberapi.com/${count}/trivia`);

	// count verisini yerel depolamada tutup
	// sayfa yenilendiğinde kaldığı yerden devam etmesini sağlarız
	useEffect(()=>{
		localStorage.setItem('count',JSON.stringify(count))
	});
	// ***************** USEREF KULLANIMI ************

	const inputRef = useRef();
	// herhangi bir data ya da dom nesnesini değişkende tutup kullanabilmek için kullanılır
	// ilgili nesnenin referansı olarak kısaltmasıdır
	// component render olmasını istemedğimiz durumlarda kullanılır
	// useref içine nesne fonksiyon değişken data.. herşey kullanılabilir.
	
	// bir component unmount edilecekse ve bu componente state güncellemesi yapılacaksa 
	// trying to set state on unmounted component hatası olmaması için
	// useref ile boolean koşul ile setstate yapılabilir 
	// ör: ilgili comp içine useefect return kısmında ref değeri false yapılır 
	// setstate ise true olma durumunda çalışması sağlanır

	return (
		<div>
			{tog && <UseeffectTestComponent/>}
			<button onClick={()=>{setTog(!tog)}}>toggoggog</button>
			<input ref={inputRef} type="email" name="email" value={values.email} onChange={handleChange}/>
			{/* bu input a ref özelliği inputRef olarak atadık */}
			<input type="password" name="password"  value={values.password} onChange={handleChange}/>
			<div>{loading ? 'loading....': data }</div>
			<div>
				<p>count: {count}</p>
				<button onClick={()=>setCount(c=>c+1)}>increment</button>
			</div>
			<button onClick={()=>{inputRef.current.focus()}}>ref button</button>
			{/* inputref değerinin current durumunun kontrolunu yapabiliriz */}
		</div>
	);











}

export default App;
