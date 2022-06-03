import tmi from 'tmi.js';

export default class TwitchChat
{
    constructor(channel)
    {
        this._listeners = [];

        this._client = new tmi.Client({
            channels: [channel]
        });

        this._connectClient();
    }

    addListener(listener)
    {
        this._listeners.push(listener);
    }

    _connectClient()
    {
        this._client.connect();
        this._client.on('message', (channel, tags, message, self) =>
        {
            this.fireOnMessage({
                channel: channel,
                message: message,
                userId: tags['user-id'],
                displayName: tags['display-name'],
                isSubscriber: tags['subscriber'],
                badges: tags['badges'],
                color: tags['color'],
                emotes: tags['emotes'],
            });
        });
    }

    fireOnMessage(message)
    {
        this._listeners.forEach(listener => listener.handleTwitchChatOnMessage(message));
    }
}