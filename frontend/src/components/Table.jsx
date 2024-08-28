import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

export default function Table() {
  return (
    <div>
        <DataTable>
            {/* First Column */}
            <Column field='null' header='null'>
                {/* First column of the First column */}
                <Column field='grade' header='Grade'>
                
                </Column  >
                {/* Second column of the First column */}
                <Column field='net each' header='Net Each' >
                
                </Column>
                {/* Third column of the First column */}
                <Column field='bf' header='BF'>
                
                </Column>

            </Column>
            {/* Second Column */}
            <Column>
                {/* First column of the Second column */}
                <Column field=''>
                    {/* First column of the Second,First column  */}
                    <Column>
                    
                    </Column>
                    {/* Second column of the Second,First column */}
                    <Column>
                    
                    </Column>

                </Column>
                {/* Second column of the Second column  */}
                <Column>
                
                </Column>
                

            </Column>
        </DataTable>
      
    </div>
  )
}
