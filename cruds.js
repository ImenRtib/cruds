
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let taxes = document.getElementById("taxes");
    let ads = document.getElementById("ads");
    let discount = document.getElementById("discount");
    let count = document.getElementById("count");
    let total = document.getElementById("total");
    let category = document.getElementById("category");
    let submit = document.getElementById("submit");
    let search= document.getElementById("search");
    let mood='create';
    let glob;
// total
    function getTotal() {
        if (price.value !== "") {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.innerHTML = `Total: ${result}`;
            total.style.backgroundColor='green';
        } else {
            total.innerHTML = "Total: 0";
            total.style.backgroundColor='red';
            
        }
    }

//create product
let dataProduct;
if(localStorage.Product != null){
    dataProduct=JSON.parse(localStorage.Product)
}
else{
    dataProduct = [];
}
  
submit.onclick=function(){

    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML.slice(6),
        count:count.value,
        category:category.value,
    }
    if(
        count.value <100 && title.value !='' && category.value!='' && price.value!=''
    ){
        if(mood==='create'){
            if (newPro.count > 1){
                for (let i =0 ; i < newPro.count ; i++){
                    dataProduct.push(newPro)
                }
            }
            else{
                dataProduct.push(newPro)
        
            }
        }
        else{
                   dataProduct[ glob ]=  newPro;
                   mood='create';
                   submit.innerHTML='Create'
                   count.style.display='block'
        }
        clearData()

    }

    localStorage.setItem('Product',JSON.stringify(dataProduct))
    showData()
   
}

//clear inputs

function clearData(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''



}

//read

function showData(){
    getTotal()
let table =``;
    for (let i = 0 ; i< dataProduct.length; i++){
        
        table +=`
        <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button  onclick="updateData(${i})">Update</button></td>
                        <td><button onclick="deleteData( ${i} )" class="delete">Delete</button></td>
                    </tr>
        `
    }

    document.getElementById("tbody").innerHTML=table
    btnDelete=document.getElementById("btnDelete");
    if(dataProduct.length > 0){
        btnDelete.innerHTML=`
             <td><button onclick="deleteAll()">Delete All (${dataProduct.length})</button></td>
        `}
    else{
        btnDelete.innerHTML='';
    }    

}
showData()

//delete product

function deleteData(i){
       dataProduct.splice(i,1)
       localStorage.Product = JSON.stringify( dataProduct )
       showData()
}

//delete all
function deleteAll(){
    localStorage.clear()
    dataProduct.splice(0)
    showData()
}

//count
//update data
function updateData(i){
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    getTotal()
    count.style.display='none';
    category.value=dataProduct[i].category;
    submit.innerHTML=`Update`
    mood='update';
    glob=i
    scroll({
        top:0,
        behaviour: 'smooth',
    })


}

//search
ch='title';
function searching1(){
       search.focus()
       ch='title';
       search.placeholder='search By Title'}
function searching2(){
    search.focus()
    ch='category'
    search.placeholder='search By Category'
} 
function returning(value){
    show(value , ch)
}  
function show(value, ch){
    let table =''; 
    let verif=false;
    for (let i=0 ; i < dataProduct.length ; i++){
            if(dataProduct[i][ch].toUpperCase().includes(value.toUpperCase()) ){
                verif=true;
                table +=`
                <tr>
                                <td>${i}</td>
                                <td>${dataProduct[i].title}</td>
                                <td>${dataProduct[i].price}</td>
                                <td>${dataProduct[i].taxes}</td>
                                <td>${dataProduct[i].ads}</td>
                                <td>${dataProduct[i].discount}</td>
                                <td>${dataProduct[i].total}</td>
                                <td>${dataProduct[i].category}</td>
                                <td><button  onclick="updateData(${i})">Update</button></td>
                                <td><button onclick="deleteData( ${i} )" class="delete">Delete</button></td>
                            </tr>
                `;
            }
        
           }
           if(verif==true){
           document.getElementById("tbody").innerHTML=table;
           document.getElementById("no").style.display='none';
        }
           else{
            document.getElementById("tbody").innerHTML=``
            document.getElementById("no").innerHTML='no result found'
            document.getElementById("no").style.display='block';
           }
    


    }

    // clean data




    document.getElementById('toggleIcon').addEventListener('click', function() {
        var stylesheet = document.getElementById('stylesheet');
        var toggleIcon = document.getElementById('toggleIcon');
        
        if (stylesheet.getAttribute('href') === 'dark.css') {
            stylesheet.setAttribute('href', 'light.css');
            toggleIcon.setAttribute('src', 'moon.png');

        } else {
            stylesheet.setAttribute('href', 'dark.css');
            toggleIcon.setAttribute('src', 'sun.png');
            
        }
    });
    





    