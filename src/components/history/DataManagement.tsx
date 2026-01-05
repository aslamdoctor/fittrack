import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { exportAllData, importData, clearAllData } from '../../utils/storage';
import { Download, Upload, Trash2 } from 'lucide-react';

export function DataManagement() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportAllData();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        if (contents) {
          importData(contents);
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearAll = () => {
    clearAllData();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
              Export your workout data as a JSON file for backup or transfer to another device.
            </p>
            <Button icon={<Download size={20} />} onClick={handleExport} variant="ghost">
              Export Data
            </Button>
          </div>

          <div>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
              Import previously exported workout data from a JSON file.
            </p>
            <Button icon={<Upload size={20} />} onClick={handleImportClick} variant="ghost">
              Import Data
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              style={{ display: 'none' }}
            />
          </div>

          <div>
            <p
              style={{
                color: 'var(--color-error)',
                marginBottom: 'var(--space-md)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              Warning: This will permanently delete all your workout data, routines, and settings.
            </p>
            <Button icon={<Trash2 size={20} />} onClick={handleClearAll} variant="danger">
              Clear All Data
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
