function removee(e,email){
        const balance=document.getElementById("balance");
        const tr=e.parentElement.parentElement;
        const id=tr.children[1].innerHTML;
        const value=parseInt(tr.children[3].children[0].innerHTML);
        balance.innerHTML=parseInt(balance.innerHTML)-value;
        const data={
            id:id
        }
        console.log(id)
        $.ajax({
            type:"POST",
            data:data,
            url:'http://localhost:5000/removetransaction',
            success:function(msg){
                    if(!msg){
                        console.log(err)
                    }
                }
        })
        tr.remove()        
    }


function add(e){
    if(document.querySelector('.list').childElementCount==0){
        const li=document.createElement('li');
        document.querySelector('.list').appendChild(li);
    }
    const list=document.querySelector('.list').children[0];
    const itemname=e.parentElement.children[0].value;
    const itemvalue=parseInt(e.parentElement.children[1].value);
    if(itemvalue && itemname){
    const data={
        itemname:itemname,
        itemvalue:itemvalue
    }
    const income=document.getElementById('income');
    const expence=document.getElementById('expence');
    const balance=document.getElementById('balance');
    if(itemvalue>0){
        income.innerHTML=parseInt(income.innerHTML)+itemvalue;
        let html=`<span>${itemname}</span><span style="color: green;">Rs +${itemvalue}</span>`
        list.innerHTML=html;
    }
    else{
        expence.innerHTML=parseInt(expence.innerHTML)+itemvalue;
        let html=`<span>${itemname}</span><span style="color: red;">Rs ${itemvalue}</span>`
        list.innerHTML=html;
    }
    e.parentElement.children[0].value='';
    e.parentElement.children[1].value='';
    balance.innerHTML=parseInt(balance.innerHTML)+itemvalue;
    $.ajax({
        type:"POST",
        data:data,
        url:'http://localhost:5000/add',
        success:function(msg){
                if(!msg){
                    console.log(err)
                }
            }
    })
    }
    else{
        alert("Enter all fields")
    }
}









// const btn=document.getElementById("btn")
// // btn.addEventListener("click",addtransaction);

//         function addtransaction(e){
//             e.preventDefault();
//             const list=document.querySelector(".list");

//             const text=document.getElementById("text").value;
//             const amount=document.getElementById("amount").value;

//             const sign=amount<0 ? '-':'+';

//             if(text==='' || amount===''){
//                 console.log("ASd")
//             }
//             else{ 
//                 if(sign=='-'){
//                 var clas="red"
//                 }
//                 else{
//                 var clas="green"
//                 }
//                 const item=document.createElement("li");
//                 item.innerHTML=`${text}<span class="${clas}">${sign}Rs ${Math.abs(amount)}</span>
//                 <i href="/removetransaction" style="color:red;" class="fa fa-remove" onclick="remove(this)"></i>`;
//                 list.appendChild(item)
//             }
//             updatevalue(sign ,amount);
//         }

        // function updatevalue(sign ,amount){
        //     const balance=document.getElementById("balance")
        //     const income=document.getElementById("income"); 
        //     const expence=document.getElementById("expence");
        //     var balancevalue=parseInt(balance.innerHTML.match(/(\d+)/)[0]);
        //     if(sign=='-'){
        //         const total=parseInt(expence.innerHTML.match(/(\d+)/)[0])+parseInt(amount); 
        //         expence.innerHTML="Rs "+total;
        //         var totalbalance=balancevalue+parseInt(amount);
        //         balance.innerHTML="Rs "+totalbalance;
        //     }
        //     else{
        //         const total=parseInt(income.innerHTML.match(/(\d+)/)[0])+parseInt(amount);
        //         income.innerHTML="Rs "+total;
        //         var totalbalance=balancevalue+parseInt(amount);
        //         balance.innerHTML="Rs "+totalbalance;
        //     }
        // }

    // function remove(e,email){
    //     const listtext=e.parentElement.textContent; 
    //     var id="";
    //     for(let i=0;i<4;i++){
    //         if(listtext.charAt(i)!=' '){
    //             id=id+listtext.charAt(i);
    //         }
    //         else{
    //             break;
    //         }
    //     }
    //     const data={
    //         id:id
    //     }
    //     $.ajax({
    //         type:"POST",
    //         data:data,
    //         url:'http://localhost:5000/removetransaction',
    //         success:function(msg){
    //                 if(msg){
    //                     console.log("AD")
    //                 }else{
    //                     alert("Server error")
    //                 }
    //             }
    //     })
    //     window.location.href='/home'
    //     e.parentElement.remove();
    // }
