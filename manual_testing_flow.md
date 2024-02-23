Create:

X Create an account => it persists, automatically added to general channel
X general is active on first sign in
X Create a channel => channel was created in the database, userchannel was created in the database
X See "No messages..." in chat window
X Create a chat message => it was created in the database
X Another client sends real-time chat and timestamp it shows up on the active channel
X Create many notifications
X Create lots of chat messages
X join lots of channels
X log out

Read:

X log in => user still has their user channels
X user still sees any unread notifications
X user still sees messages

Delete:

X user clicks on a notification to reset it
X user leaves channels => see database changes
X can leave first, last, and middle channel (database persists)
X leaving the active channel makes the first channel active
X leaving the active channel when it's the first makes the one below it (the new first) active
X deleting all channels, see "You have not joined any channels yet."
X user logs out, logs in, those channels have been left

Real-time:

- real-time notification and timestamp shows up on a non-active channel
- real-time notification goes away when clicked on that channel

Other:
- joining an existing channel just makes that channel active
- too many messages in active chat result in scroll bar and pushed messages push
- too many channels result in scroll bar that pushed channels up
- clicking on a notification channel with lots of messages results in a fast scroll down
