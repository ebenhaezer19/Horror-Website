import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24">
      <Card className="bg-gray-900/50 border-gray-800 p-8">
        <h2 className="text-4xl font-serif mb-8 text-center">Whisper into the Void</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">What haunts your dreams?</label>
            <input 
              type="text"
              className="w-full bg-black/50 border border-gray-800 rounded-md p-3 focus:ring-red-900 focus:border-red-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Share your darkest thoughts</label>
            <textarea 
              rows={4}
              className="w-full bg-black/50 border border-gray-800 rounded-md p-3 focus:ring-red-900 focus:border-red-900"
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800"
          >
            Send into the Abyss
          </Button>
        </form>
      </Card>
    </section>
  );
}