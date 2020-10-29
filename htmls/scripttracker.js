const btn=document.getElementById("btn")
// btn.addEventListener("click",addtransaction);

        function addtransaction(e){
            e.preventDefault();
            const list=document.querySelector(".list");

            const text=document.getElementById("text").value;
            const amount=document.getElementById("amount").value;

            const sign=amount<0 ? '-':'+';

            if(text==='' || amount===''){
                console.log("ASd")
            }
            else{ 
                if(sign=='-'){
                var clas="red"
                }
                else{
                var clas="green"
                }
                const item=document.createElement("li");
                item.innerHTML=`${text}<span class="${clas}">${sign}Rs ${Math.abs(amount)}</span>
                <i href="/removetransaction" style="color:red;" class="fa fa-remove" onclick="remove(this)"></i>`;
                list.appendChild(item)
            }
            updatevalue(sign ,amount);
        }

        function updatevalue(sign ,amount){
            const balance=document.getElementById("balance")
            const income=document.getElementById("income"); 
            const expence=document.getElementById("expence");
            var balancevalue=parseInt(balance.innerHTML.match(/(\d+)/)[0]);
            if(sign=='-'){
                const total=parseInt(expence.innerHTML.match(/(\d+)/)[0])+parseInt(amount); 
                expence.innerHTML="Rs "+total;
                var totalbalance=balancevalue+parseInt(amount);
                balance.innerHTML="Rs "+totalbalance;
            }
            else{
                const total=parseInt(income.innerHTML.match(/(\d+)/)[0])+parseInt(amount);
                income.innerHTML="Rs "+total;
                var totalbalance=balancevalue+parseInt(amount);
                balance.innerHTML="Rs "+totalbalance;
            }
        }

    function remove(e,email){
        const listtext=e.parentElement.textContent;
        console.log(listtext)  
        var id="";
        for(let i=0;i<4;i++){
            if(listtext.charAt(i)!=' '){
                id=id+listtext.charAt(i);
            }
            else{
                break;
            }
        }
        window.location.href='/removetransaction? email='+email+'& id='+id
        console.log(itemname,itemvalue,email);
        e.parentElement.remove();
    }

    function removee(e,email){
        const listtext=e.parentElement.textContent;
        var id="";
        var j=0;
        while(listtext.charAt(j)!=')'){
            j++;
        }
        console.log(listtext.charAt(j))
        for(let i=j+1;i<j+5;i++){
            if(listtext.charAt(i)!=' '){
                id=id+listtext.charAt(i);
            }
            else{
                break;
            }
        }
        console.log(id);
        console.log(email);
        window.location.href='/removeetransaction?email='+email+'&id='+id
        console.log(id);
    }
