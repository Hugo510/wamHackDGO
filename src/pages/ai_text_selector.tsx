import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare } from "lucide-react";

export default function AIAssistant() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-row space-x-4 justify-center">
            {/* Link de react-router-dom debe envolver a Button directamente */}
            <Link to="/register" className="flex-1">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                variant="default"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat Assistant
              </Button>
            </Link>
            
            <Link to="/ai-assistant/voice" className="flex-1">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                variant="default"
              >
                <Mic className="h-5 w-5 mr-2" />
                Voice Assistant
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
