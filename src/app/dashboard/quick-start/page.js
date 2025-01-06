import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QuickStart = () => {
  return (
    <div className="container flex flex-col space-y-4">
      <h1 className="text-xl font-bold">Quick Start</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>1. What is this?</AccordionTrigger>
          <AccordionContent>
            This is an early-stage SEO tool designed to generate and update
            WordPress media (images) with SEO best practices. It leverages LLMs
            through Next.js, Ollama, and Langchain. It's a work in progress, but
            it already offers a neat integration between AI and WordPress.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>2. How do I install and run it?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              First, grab the source code from our GitHub repo here:{" "}
              <a
                href="https://github.com/DiegoGonzalezCruz/seo-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://github.com/DiegoGonzalezCruz/seo-tools
              </a>
            </p>
            <p>
              This is a Next.js project, so once you clone the repo, install
              dependencies and run the development server:
            </p>
            <ul className="list-disc ml-5">
              <li>
                <code>npm install</code> or <code>yarn install</code> (to
                install all dependencies)
              </li>
              <li>
                <code>npm run dev</code> or <code>yarn dev</code> (to start the
                development server)
              </li>
              <li>
                Open <strong>http://localhost:3000</strong> in your browser to
                see the app in action.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            3. What do I need on my local machine?
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc ml-5">
              <li>
                Node.js and your preferred package manager (npm, yarn, pnpm, or
                bun).
              </li>
              <li>
                Ollama installed (which usually runs at{" "}
                <strong>http://localhost:11434</strong>).
              </li>
              <li>
                <strong>llava</strong> and <strong>llama3</strong> models
                installed in Ollama. Depending on your hardware, other models
                may work, but we're only testing with those two at this time.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            4. How do I connect it to my WordPress site?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              You'll need a WordPress Application Password (for the latest
              version of WordPress). Here’s a concise tutorial:
            </p>
            <p>
              <a
                href="https://youtu.be/f0Why33eS0Y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                How to Generate a WordPress App Password
              </a>
            </p>
            <p className="mt-2">
              Once you have your credentials, you can add them to the
              application environment to let our tool push image data directly
              into your WordPress media library. No special security plugins are
              required, but if you need advanced configurations or run into
              issues, feel free to reach out at{" "}
              <strong>diego@thinkey.us</strong>.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>5. Roadmap and Future Features</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              This tool is still in active development! Here’s what’s coming:
            </p>
            <ul className="list-disc ml-5">
              <li>
                **OpenAI Integration**: We plan on offering an option to swap
                out the local AI models with OpenAI, if desired.
              </li>
              <li>
                **Automatic Title Generator**: Seamlessly generate SEO-optimized
                titles.
              </li>
              <li>
                **Server-Side Image Updates**: Have the tool update your images
                directly on the server, no manual uploading required.
              </li>
              <li>
                **Feedback Button**: A quick way for users to share feedback,
                bug reports, or feature requests.
              </li>
            </ul>
            <p className="mt-2">
              If you have suggestions or want to see a specific feature, don’t
              hesitate to reach out via email or open an issue in GitHub.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default QuickStart;
