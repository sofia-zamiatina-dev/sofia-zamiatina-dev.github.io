export default function About() {
    return (
      <div className="p-8 max-w-3xl text-foreground bg-background min-h-screen">
        <h1 className="text-2xl font-semibold mb-2">About Me</h1>
  
        <p className="text-foreground/80">
          Master of Software Engineering candidate at the University of Melbourne.
          I enjoy building systems that blend interaction, data, and design.
        </p>
  
        <ul className="list-disc ml-6 mt-4 space-y-1 text-foreground/75">
          <li>Now: Unity networking, ML for weather</li>
          <li>Interests: game mechanics, data viz, human-in-the-loop UX</li>
          <li>Download my CV from the sidebar (Sofia → Resume)</li>
        </ul>
      </div>
    );
  }
  