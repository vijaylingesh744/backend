import { ref, push, get,set, onValue, off } from 'firebase/database';
import { db } from '../../../../firebase.js';
import FetchData from '../../../fetch-api/Apifetch';

export const fetchNewMessages = async (nodeId) => {
    const dbName = `chats/${nodeId}`;
    const messagesRef = ref(db, dbName);

    try {
        const snapshot = await get(messagesRef);
        const messagesWithIds = [];

        snapshot.forEach(childSnapshot => {
            const messageId = childSnapshot.key;
            const messageData = childSnapshot.val();
            messagesWithIds.push({ id: messageId, ...messageData });
        });

        return messagesWithIds; // Return the array of messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};




export const fetchAndDisplayMessages = async (nodeId,userId) => {
    const messages = await fetchNewMessages(nodeId);
    var datalen=messages.filter(item =>(item?.seendata?.status==false && item.seendata?.user == userId));
    return {nodeId,count:datalen.length};
};


export const UpdateAsSeenMessage = async (nodeid,userId) => {
    const messages = await fetchNewMessages(nodeid);
    
    try {
        for (const message of messages) {
        if(message.id ){
            const messageRef = ref(db, `chats/${nodeid}/${message.id}`); // Ensure the path is correct
            if(userId == message?.seendata?.user){
                await set(messageRef, { ...message, seendata: {status:true,user:userId} });
            }
        }
    }
    } catch (error) {
        console.error("Error updating messages in Firebase:", error);
    }

    return messages;
};


export const ListBadgeCount = async (userId)=>{
    const res = await FetchData(`chatlist/${userId}`, 'GET', null, true, false)
    if (res.status) {
      var list = res.data.filter(item =>item.status ==1);
      const results = await Promise.all(list.flatMap(item => fetchAndDisplayMessages(item.nodeId,userId.toString())));
      const totalCount = results.reduce((sum, item) => sum + item.count, 0);
      console.log("Message",results)
      return totalCount
    }else{
        return 0
    }
}