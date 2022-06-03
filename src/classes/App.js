import $ from 'jquery';
import _ from 'lodash';
import TwitchChat from '../utils/TwitchChat';
import Editor from './Editor';

export default class App
{
    constructor(element)
    {
        this._element = $(element);

        this._chat = new TwitchChat(this._element.data('channel'));
        this._chat.addListener(this);

        this._editor = new Editor(this);
    }

    getElement()
    {
        return this._element;
    }

    handleTwitchChatOnMessage(message)
    {
        if (_.startsWith(message.message, '!ide'))
        {
            this._editor.handleIDECommand(message.displayName, message.message);
        }
    }
}
