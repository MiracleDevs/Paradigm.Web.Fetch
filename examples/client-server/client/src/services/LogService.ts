export class LogService
{
    private logSection: HTMLElement;

    constructor()
    {
        const root = document.querySelector('body');
        this.logSection = document.createElement('div');

        if (root)
        {
            root.appendChild(this.logSection);
        }
    }

    info(message: string): void
    {
        this.write(message, "blue");
    }

    warn(message: string): void
    {
        this.write(message, "yellow");
    }

    error(message: string): void
    {
        this.write(message, "red");
    }

    private write(message: string, color: string): void
    {
        this.logSection.innerHTML += `<span style="color: ${color}">${message}</span>`;
    }
}
