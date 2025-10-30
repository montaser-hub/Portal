
import React from 'react';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../../common/Card';
import  Text  from '../../common/Text';
export function NotesCard({ notes, maxItems = 3 }) {
    return (
        <Card className="p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-800">
            <FileText className="h-5 w-5" />
            <Text as="h3" MyClass="font-medium" content="Recent Notes" />
          </div>

          <div className="space-y-3">
            {notes.slice(0, maxItems).map(note => (
              <div key={note.id} className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <Text as="h4" MyClass="truncate font-medium text-gray-800" content={note.title} />
                    <Text as="p" MyClass="text-gray-500 text-sm line-clamp-2 mt-1" content={note.content} />
                  </div>
                  <Text as="span" MyClass="text-xs text-gray-500 whitespace-nowrap pt-1" content={format(new Date(note.timestamp), 'MM/dd/yyyy')}
/>
                </div>
              </div>
            ))}
          </div>
        </Card>

    );
}

export default NotesCard;
