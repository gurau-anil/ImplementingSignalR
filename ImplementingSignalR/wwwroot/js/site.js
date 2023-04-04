// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/messageHub")
.configureLogging(signalR.LogLevel.Information)
    .build();

$('#send-btn').click(function () {
    var message = $("#message-area").val();
    connection.invoke("Notify", message).catch(err => console.error(err.toString()));
});

connection.on("ReceiveMessage", (message) => {
    console.log(message);
    $('#message-panel').prepend($('<div />').text(message));

});

async function start() {
    try {
        await connection.start();
        console.log('connected');
       
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
       
    }
   
};
connection.onclose(async () => {
    await start();
   
});
start();