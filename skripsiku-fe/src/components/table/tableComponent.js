import React, { useState } from "react";
import PropTypes from "prop-types";

import PerfectScrollbar from "react-perfect-scrollbar";
import {
	Card,
	Box,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TablePagination,
	LinearProgress,
	Typography,
} from "@mui/material";

class TableComponent extends React.Component {
	state = {
		rowsPerPage: 5,
		page: 1,
		selectedItems: [],
	};

	handlePageChange = (event, page) => {
		const { onPaginationUpdate } = this.props;

		this.setState(
			{
				page: page + 1,
			},
			() => {
				const { rowsPerPage, page } = this.state;

				onPaginationUpdate({ limit: rowsPerPage, page: page });
			},
		);
	};

	handleRowsPerPageChange = (event) => {
		const { onPaginationUpdate } = this.props;

		this.setState(
			{
				rowsPerPage: event.target.value,
			},
			() => {
				const { rowsPerPage, page } = this.state;

				onPaginationUpdate({ limit: rowsPerPage, page: page });
			},
		);
	};

	handleSingleSelect = (item) => {
		const { selectedItems } = this.state;
		const { onRowChecked } = this.props;
		let index;
		let newSelectedItems = [...selectedItems];
		let selectedItem = selectedItems.find((selectedItem, selectedIndex) => {
			index = selectedIndex;
			return item.id == selectedItem.id;
		});

		if (selectedItem) {
			newSelectedItems.splice(index, 1);
		} else {
			newSelectedItems.push(item);
		}

		this.setState(
			{
				selectedItems: newSelectedItems,
			},
			() => {
				const { selectedItems } = this.state;
				onRowChecked(selectedItems);
			},
		);
	};

	handleSelectAll = (event) => {
		const { onRowChecked, data } = this.props;

		let selectedItems = [];

		if (event.target.checked) {
			data.map((item) => {
				if (!item.checkboxDisabled) {
					selectedItems.push(item);
				}
			});
		} else {
			selectedItems = [];
		}

		this.setState(
			{
				selectedItems: selectedItems,
			},
			() => {
				const { selectedItems } = this.state;
				onRowChecked(selectedItems);
			},
		);
	};

	ifItemSelected = (item) => {
		const { selectedItems } = this.state;

		let selectedItem = selectedItems.find((selectedItem) => {
			return item.id == selectedItem.id;
		});

		if (selectedItem) {
			return true;
		}

		return false;
	};

	handleSearch = (e, type) => {
		if (this.props.onFilter) {
			this.props.onFilter(e, type);
		}
	};

	render() {
		const { classes } = this.props;
		const { selectedItems, rowsPerPage, page } = this.state;
		const {
			withCheckbox,
			data,
			columns,
			onPaginationUpdate,
			busy,
			onRowChecked,
			className,
			count,
			needPagination = true,
			isActiveCustomFilter,
		} = this.props;

		return (
			<Card>
				<PerfectScrollbar>
					<Box sx={{ minWidth: 1050 }}>
						<Table>
							<TableHead>
								<TableRow>
									{withCheckbox ? (
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												value="true"
												checked={selectedItems.length == data.length}
												onChange={this.handleSelectAll}
											/>
										</TableCell>
									) : null}
									{columns.map((item, index) => {
										return (
											<TableCell key={index}>{item.displayName}</TableCell>
										);
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									{withCheckbox ? (
										<TableCell padding="checkbox"></TableCell>
									) : null}
								</TableRow>
							</TableBody>
							<TableBody>
								{busy ? (
									<TableRow>
										<TableCell
											colSpan={
												withCheckbox ? columns.length + 1 : columns.length
											}
										>
											<LinearProgress />
										</TableCell>
									</TableRow>
								) : null}
								{data && data.length > 0 ? (
									data.map((item, index) => {
										return (
											<TableRow
												key={`row-${index}`}
												onClick={(e) =>
													this.props.rowOnClick
														? this.props.rowOnClick(item)
														: null
												}
												style={{
													cursor: this.props.rowOnClick
														? "pointer"
														: "default",
												}}
											>
												{withCheckbox ? (
													<TableCell padding="checkbox">
														<Checkbox
															color="primary"
															value="true"
															checked={this.ifItemSelected(item)}
															onClick={(e) => {
																e.stopPropagation();
															}}
															onChange={(e) =>
																this.handleSingleSelect(item)
															}
															disabled={item.checkboxDisabled}
														/>
													</TableCell>
												) : null}
												{columns.map((column, columnIndex) => {
													return (
														<TableCell key={`cell-${columnIndex}`}>
															{column.customRender
																? column.customRender(item)
																: item[column.name]}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})
								) : (
									<TableRow
										style={{
											height: "200px",
										}}
									>
										<TableCell
											colSpan={
												withCheckbox ? columns.length + 1 : columns.length
											}
											style={{
												textAlign: "center",
											}}
										>
											<Typography>No Data</Typography>
										</TableCell>
									</TableRow>
								)}
								{/* {data && data.length > 0 ? (
									data.map((item, index) => {
										return (
											<TableRow
												key={`row-${index}`}
												onClick={(e) =>
													this.props.rowOnClick
														? this.props.rowOnClick(item)
														: null
												}
												style={{
													cursor: this.props.rowOnClick
														? "pointer"
														: "default",
												}}
											>
												{withCheckbox ? (
													<TableCell padding="checkbox">
														<Checkbox
															color="primary"
															value="true"
															checked={this.ifItemSelected(item)}
															onClick={(e) => {
																e.stopPropagation();
															}}
															onChange={(e) =>
																this.handleSingleSelect(item)
															}
															disabled={item.checkboxDisabled}
														/>
													</TableCell>
												) : null}
												{columns.map((column, columnIndex) => {
													return (
														<TableCell key={`cell-${columnIndex}`}>
															{column.customRender
																? column.customRender(item)
																: item[column.name]}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})
								) : (
									<TableRow
										style={{
											height: "200px",
										}}
									>
										<TableCell
											colSpan={
												withCheckbox ? columns.length + 1 : columns.length
											}
											style={{
												textAlign: "center",
											}}
										>
											<Typography>No Data</Typography>
										</TableCell>
									</TableRow>
								)} */}
							</TableBody>
						</Table>
					</Box>
				</PerfectScrollbar>
				{needPagination && (
					<TablePagination
						component="div"
						count={count}
						onPageChange={this.handlePageChange}
						onChangeRowsPerPage={this.handleRowsPerPageChange}
						page={page - 1}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				)}
			</Card>
		);
	}
}

// Table.propTypes = {
// 	className: PropTypes.string,
// 	items: PropTypes.array.isRequired,
// 	busy: PropTypes.bool.isRequired,
// 	withCheckbox: PropTypes.bool.isRequired,
// };

export default TableComponent;
