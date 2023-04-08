using Microsoft.AspNetCore.SignalR;

namespace ImplementingSignalR.Hubs
{
    public class MessageHub : Hub
    {
        public MessageHub()
        {
        }

        public async Task Notify(string message)
        {
            //Sending Message to all clients. 'ReceiveMessage' method can be invoked in frontend to receive the message sent from here. 
            // Note: The method name should exactly match to get the message sent from here.
            //await Clients.All.SendAsync("ReceiveMessage",message);


            //Sending message to connected clients other than yourself
            await Clients.Others.SendAsync("ReceiveMessage",message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
