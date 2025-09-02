export default function Contact() {
    return (
      <div className="p-8 max-w-xl text-foreground">
        <h1 className="text-2xl font-semibold mb-2">Contact</h1>
  
        <div className="space-y-2 text-foreground/80">
          <div>
            Email:{" "}
            <a
              className="underline text-primary hover:text-primary/80"
              href="mailto:sofia@zamiatina.dev"
            >
              sofia@zamiatina.dev
            </a>
          </div>
  
          <div>
            GitHub:{" "}
            <a
              className="underline text-primary hover:text-primary/80"
              href="https://github.com/sofia-zamiatina"
              target="_blank"
              rel="noreferrer"
            >
              sofia-zamiatina
            </a>
          </div>
  
          <div>
            LinkedIn:{" "}
            <a
              className="underline text-primary hover:text-primary/80"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/...
            </a>
          </div>
        </div>
      </div>
    );
  }
  