import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckPredicate from "../../../helpers/checkPredicate"

export default function BasicTable(props: any) {
    const { data, submissionApproval, submissionSeminarApproval, isFinalSection = false } = props;

    // let total: any;
    // let renderTotal;
    // if (isFinalSection) {
    //     let avgSeminar: any = submissionSeminarApproval.length > 0 && submissionSeminarApproval[0].average_score * 0.3;
    //     let avgFinal: any = submissionApproval.length > 0 && submissionApproval[0].average_score * 0.7;
    //     // total = parseFloat(avgSeminar).toFixed(1) + parseFloat(avgFinal).toFixed(1);
    //     total = avgSeminar + avgFinal;

    //     renderTotal = (
    //         <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '16px', paddingRight: '36px', paddingTop: '12px' }}>
    //             <div style={{ fontSize: '14px' }}>Nilai Tugas Akhir = (30% x Nilai Rata-rata Seminar) + (70% x Nilai Rata-rata Ujian)</div>
    //             <div style={{ fontSize: '14px' }}>{total}</div>
    //         </div>
    //     )
    // }

    return (
        <div>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nama Penguji</TableCell>
                            <TableCell align="center">Isi Materi (50%)</TableCell>
                            <TableCell align="center">Penyampaian (20%)</TableCell>
                            <TableCell align="center">Penguasaan (30%)</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any, index: any) => (
                            <TableRow
                                key={index}
                                style={{ borderBottom: '2px solid #E6E8F0' }}
                            // sx={{ '&:last-child td, &:last-child th': { border: '50px' } }}
                            >
                                <TableCell align="left">
                                    {row.lecturer.first_name} {row.lecturer.last_name}
                                </TableCell>
                                <TableCell align="center" >{row.score_content}</TableCell>
                                <TableCell align="center" >{row.score_content_delivery}</TableCell>
                                <TableCell align="center">{row.score_content_mastery}</TableCell>
                                <TableCell align="center" >{row.score_average}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {submissionApproval.map((row: any, index: any) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '16px', paddingRight: '36px', paddingTop: '12px' }}>
                    <div style={{ fontSize: '14px' }}>Nilai Rata-rata</div>
                    <div style={{ fontSize: '14px' }}>{row.average_score}</div>
                </div>
            ))}
            {submissionApproval.map((row: any, index: any) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '16px', paddingRight: '36px', paddingTop: '12px' }}>
                    <div style={{ fontSize: '14px' }}>Keterangan</div>
                    <div style={{ fontSize: '14px' }}>{CheckPredicate(row.average_score)}</div>
                </div>
            ))}
            {/* {renderTotal} */}
        </div>
    );
}