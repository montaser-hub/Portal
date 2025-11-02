import React from 'react';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import  Card  from '../../common/Card';
import  Text  from '../../common/Text';
export function NotesCard( {notes} ) {
    return (
        <Card className="p-6 space-y-4 shadow-sm bg-white border-gray-200">
          <div className="flex items-center gap-2 text-gray-800">
            <FileText className= "h-5 w-5 text-[#0F7B8A]" />
            <Text as="h3" MyClass="font-normal text-gray-500" content="Recent Notes" />
          </div>

          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="p-3 bg-[#E8EEF1]/20 rounded-lg border border-[#E5E7EB]">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <Text as="h4" MyClass="truncate font-normal text-gray-800" content={note.title} />
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
