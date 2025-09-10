import { AlertCircle } from 'lucide-react';
import type { Alert } from '@/types/student';

interface AlertCardProps {
    alert: Alert;
    index: number;
}

export function AlertCard({ alert, index }: AlertCardProps) {
    const getAlertStyles = (type: Alert['type']) => {
        switch (type) {
            case 'warning':
                return 'bg-orange-50 border-orange-200 text-orange-800';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    return (
        <div key={index} className={`flex items-start gap-3 p-4 rounded-lg border ${getAlertStyles(alert.type)}`}>
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{alert.message}</p>
        </div>
    );
}
