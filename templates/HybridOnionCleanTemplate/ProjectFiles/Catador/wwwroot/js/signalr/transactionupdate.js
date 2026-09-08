"use strict";

const signalRConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${appPathBase}/NotifyNewTransactionsHub?userId=${userId}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

const connect = async (conn) => {
    conn.start().catch(async (e) => {
        console.log(e.toString());
        await sleep(10000);
        console.log("Reconnecting Socket");
        connect(conn);
    }).then(() => {
        conn.invoke("GetConnectionId").then(function (connectionId) {
            setValue("signalRConnectionId", connectionId);
            console.log("SignalR Connection established");
        })
    });
}

signalRConnection.onclose(async () => {
    //console.log(e.toString())
    await connect(signalRConnection);
});

signalRConnection.on("newTransactionsUpdate", async (result, count,makeSound=false) => {
    const { dataCount } = result;
    const { data:resultData } = formatResponse(result);
    let data=[];
    if(!Array.isArray(resultData))
        data = [resultData];
    else
        data = resultData;

    const retainedOrders = transactions.filter((key) => {
        const statusId = key.orderStatusId;
        const status = orderStatus.find(findObjectByProperty('id', statusId));
        if (status.notifyAdmin)
            return key;
    });
    const newRetainedOrders = data.filter((key) => {
        const statusId = key.orderStatusId;
        const status = orderStatus.find(findObjectByProperty('id', statusId));
        if (status.notifyAdmin)
            return key;
    });

    let newRetainedCount=0;
    for (let key of newRetainedOrders) {
        const keyId = key.id;
        const exists = retainedOrders.find(findObjectByProperty('id', keyId));
        if (exists == null)
            newRetainedCount++;
    }
    transactions = data;
  
    if (newRetainedCount>0) {
        await playAudio('notificationAudio', 3);
        //function playSound(mysound) {
        //    //thisSound = document.getElementById(mysound);
        //    //thisSound.Play();
        //    var audio = new Audio(mysound);
        //    audio.play();
        //}
        //playSound();
    }
    
    transactionsCount = dataCount;
    setHtml('transactionsCount', transactionsCount )
    await destroyDataTable('TblTransactions');
    await populateTransactionTable(
        //transactions.map(mapWithParams(['id', 'brandId', 'storeName', 'code', 'checkNo', 'appName', 'customerPhone', 'orderTypeId', 'receivedDate', 'deliveryDate', 'totalAmount', 'paymentAmount', 'orderStatusId']))
        data.map(mapWithParams(['id', 'orderStatusName', 'brandId', 'storeName', 'referenceNumber', 'checkNo', 'orderTime', 'paymentAmount', 'timeElapsed', 'receivedDate','deliveryDate', 'deliveryTime', 'customerId', 'customerName', 'customerPhone', 'customerEmail','comments']))
        )
        $('.fs-table-search', '#TblTransactions').trigger('click');
        if (count == 1) {
            swalToast(`Se ha recibido ${count} nueva órden`, SwalIcon.INFO, 5000);
            //console.log(`Se ha recibido ${count} nueva órden`);
        }
        else if (count > 1) {
            //console.log(`Se han recibido (${count}) nuevas órdenes`);
            swalToast(`Se han recibido (${count}) nuevas órdenes`, SwalIcon.INFO, 5000);
        }
    //}
    
       
});


connect(signalRConnection);




//connection.start().catch(function (err) {
//    console.error(err.toString());
//    sleep(5000);
//    console.log("Reconnecting Socket");
//    connect(conn);  
//}).then(function () {
//    connection.invoke("GetConnectionId").then(function (connectionId) {
//        setValue("signalRConnectionId", connectionId);
//        console.log("SignalR Connection established");
//    })
//});





//connection.error()(function (error) {
//    console.log('SignalR error: ' + error)
//});
//connection.hub.connectionSlow(function () {
//    console.log('We are currently experiencing difficulties with the connection.')
//});

//connection.hub.disconnected(function () {
//    setTimeout(function () {
//        connection.hub.start();
//    }, 10000); // Restart connection after 5 seconds.
//});


//"use strict";
//var connection = new signalR.HubConnectionBuilder().withUrl("/NotifyNewTransactionsHub?userId=" + userId).build();
//connection.on("newTransactionsUpdate", (count) => {
//    if (count==1)
//        swalToast(`Se ha recibido ${newTransactions} nueva órden`, SwalIcon.INFO, 5000);
//    else if (count > 1)
//        swalToast(`Se han recibido (${newTransactions}) nuevas órdenes`, SwalIcon.INFO, 5000);
//});
//connection.start().catch(function (err) {
//    return console.error(err.toString());
//}).then(function () {
//    document.getElementById("user").innerHTML = "UserId: " + userId;
//    connection.invoke("GetConnectionId").then(function (connectionId) {
//        document.getElementById("signalRConnectionId").innerHTML = connectionId;
//    })
//});
