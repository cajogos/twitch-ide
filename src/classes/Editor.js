import $ from 'jquery';
import _ from 'lodash';

export default class Editor
{
    static bannedSelectors = [
        'script', 'body'
    ];

    constructor(app)
    {
        this._app = app;
    }

    handleIDECommand(user, message)
    {
        const command = message.split(' ')[1];
        switch (command)
        {
            case 'create':
                this.create({
                    elementType: message.split(' ')[2],
                    extraTokens: message.split(' ').slice(3)
                });
                break;
            case 'style':
                this.style({
                    selector: message.split(' ')[2],
                    style: message.split(' ').slice(3).join(' ')
                });
                break;
            case 'attribute':
            case 'attr':
                this.attribute({
                    selector: message.split(' ')[2],
                    key: message.split(' ')[3],
                    value: message.split(' ').slice(4).join(' ')
                });
                break;
            case 'text':
                this.text({
                    selector: message.split(' ')[2],
                    text: message.split(' ').slice(3).join(' ')
                });
                break;
            case 'append':
                this.append({
                    selector: message.split(' ')[2],
                    elementType: message.split(' ')[3],
                    extraTokens: message.split(' ').slice(4)
                });
                break;
        }
    }

    // !ide create div id=test class=test
    // !ide create input type=password id=test class=test
    create({ elementType, extraTokens })
    {
        if (Editor.bannedSelectors.includes(elementType)) return;

        const newElement = this._createNewElement(elementType, extraTokens);
        this._app.getElement().append(newElement);
    }

    // !ide style #test background-color:red;color:blue;border:1px solid black
    // !ide style .container background-color:red;color:green
    style({ selector, style })
    {
        if (Editor.bannedSelectors.includes(selector)) return;

        const element = $(`${selector}`);
        if (element.length > 0)
        {
            const styles = style.split(';');
            for (let i = 0; i < styles.length; i++)
            {
                const key = styles[i].split(':')[0];
                const value = styles[i].split(':').slice(1).join(':');
                element.css(key, value);
            }
        }
    }

    attribute({ selector, key, value })
    {
        if (Editor.bannedSelectors.includes(selector)) return;

        const element = $(`${selector}`);
        if (element.length > 0)
        {
            element.attr(key, value);
        }
    }

    // !ide text #test Hello World
    text({ selector, text })
    {
        if (Editor.bannedSelectors.includes(selector)) return;

        const element = $(`${selector}`);
        if (element.length > 0)
        {
            element.text(text);
        }
    }

    // !ide append #test div id=test class=test
    append({ selector, elementType, extraTokens })
    {
        if (Editor.bannedSelectors.includes(elementType)) return;
        if (Editor.bannedSelectors.includes(selector)) return;

        const element = $(`${selector}`);
        if (element.length > 0)
        {
            const newElement = this._createNewElement(elementType, extraTokens);
            element.append(newElement);
        }
    }

    /**
     * @param {string} elementType
     * @param {array} extraTokens
     * @returns {jQuery}
     */
    _createNewElement(elementType, extraTokens)
    {
        let newElement = $(`<${elementType}>`);
        for (let i = 0; i < extraTokens.length; i++)
        {
            if (_.startsWith(extraTokens[i], 'id='))
            {
                newElement.attr('id', extraTokens[i].substring(3));
            }
            else if (_.startsWith(extraTokens[i], 'class='))
            {
                newElement.attr('class', extraTokens[i].substring(6));
            }
            else if (_.startsWith(extraTokens[i], 'type='))
            {
                newElement.attr('type', extraTokens[i].substring(5));
            }
        }
        return newElement;
    }
}
