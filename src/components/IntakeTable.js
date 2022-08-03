import React from 'react';
import IntakeRow from './IntakeRow';

function IntakeTable( { intakes, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Intake ID</th>
                    <th>Pet ID</th>
                    <th>Pet Name</th>
                    <th>Intake Date</th>
                    <th>Processor</th>
                    <th>Drop Off Type</th>
                    <th>Intake Details</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {intakes.map((intake, i) => <IntakeRow intakes={intake}
                    onDelete={onDelete}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default IntakeTable;