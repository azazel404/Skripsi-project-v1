import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckPredicate from '~/src/helpers/checkPredicate';

export default function SummaryTable(props: any) {
    const { data, submissionApproval, submissionSeminarApproval, } = props;


    let avgSeminar: any = submissionSeminarApproval.length > 0 && submissionSeminarApproval[0].average_score;
    let avgFinal: any = submissionApproval.length > 0 && submissionApproval[0].average_score;
    // total = parseFloat(avgSeminar).toFixed(1) + parseFloat(avgFinal).toFixed(1);
    let total: any = avgSeminar + avgFinal;

    return (
        <div>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nilai Seminar</TableCell>
                            <TableCell align="center">Nilai Ujian </TableCell>
                            <TableCell align="center">Nilai Angka Tugas Akhir</TableCell>
                            <TableCell align="center">Keterangan</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            style={{ borderBottom: '2px solid #E6E8F0' }}
                        >
                            <TableCell align="left">
                                {parseFloat(avgSeminar).toFixed(1)}
                            </TableCell>
                            <TableCell align="center" >{parseFloat(avgFinal).toFixed(1)}</TableCell>
                            <TableCell align="center" >{total / 2}</TableCell>
                            <TableCell align="center" >{CheckPredicate(total / 2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}