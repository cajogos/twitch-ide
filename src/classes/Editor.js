import $ from 'jquery';
import _ from 'lodash';

export default class Editor
{
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
                this.attribute(tokens);
                break;
            case 'append':
                this.append(tokens);
                break;
        }
    }

    // !ide create div id=test class=test
    // !ide create input type=password id=test class=test
    create({ elementType, extraTokens })
    {
        let newElement = $(`<${elementType}>`);
        this._app.getElement().append(newElement);
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

        const hexColor = Math.floor(Math.random() * 16777215).toString(16);
        newElement.css({
            background: `#${hexColor}`
        });
    }

    // !ide style #test background-color:red;color:blue;border:1px solid black
    // !ide style .container background-color:red;color:green
    style({ selector, style })
    {
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
        const element = $(`${selector}`);
        if (element.length > 0)
        {
            element.attr(key, value);
        }
    }

    append(segments)
    { }
}