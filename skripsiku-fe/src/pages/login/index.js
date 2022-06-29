import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, Container, TextField, Typography, Grid } from "@mui/material";
import Spacer from "../../components/spacer";
import { getCsrfToken, signIn, getSession } from "next-auth/react";
import Navbar from "../../layout/client/navbar";
import Image from "next/image";

const Login = (props) => {
	const [isFetching, setIsFetching] = useState(false);
	const [isError, setIsError] = useState(false);
	const router = useRouter();

	const { csrfToken, session } = props;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// defaultValues: initialValues,
	});

	const onSubmit = (data) => {
		setIsFetching(true);
		signIn("credentials", {
			username: data.username,
			password: data.password,
			redirect: false,
			// callbackUrl: "/e-repository",
		})
			.then((signInResponse) => {
				if (signInResponse.status === 401 || signInResponse.error === "CredentialsSignin") {
					setIsError(true);
				} else {
					window.location = "/dashboard";
					// if (callbackUrl) {
					// 	router.push(callbackUrl);
					// } else {
					// 	router.push("/test");
					// }
				}
			})

			.finally(() => {
				setIsFetching(false);
			});
	};

	return (
		<>
			<Head>
				<title>Login | Universitas Universal</title>
			</Head>
			<div style={{ backgroundColor: "#fff", height: "100vh" }}>
				<Navbar />
				<Container
					style={{
						height: "calc(100vh - 64px)",
						padding: "1.5rem",

						display: "flex",
						alignItems: "center",
					}}
				>
					<Grid
						container
						spacing={12}
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Grid item xs={6}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Box sx={{ my: 3 }}>
									<Typography color="primary" variant="h2">
										Login
									</Typography>
								</Box>
								{!isError ? null : (
									<span style={{ color: "red", fontWeight: "bold" }}>
										Invalid NIM or Password
									</span>
								)}
								<form onSubmit={handleSubmit(onSubmit)}>
									{/* <input
										name="csrfToken"
										type="hidden"
										defaultValue={csrfToken}
									/> */}

									<div style={{ paddingBottom: "4px" }}>
										<p>NIM / NIDN</p>
										<Controller
											name="username"
											control={control}
											render={({ field }) => (
												<TextField
													size="small"
													{...field}
													variant="outlined"
													disabled={isFetching}
													error={!!errors.username}
													helperText={
														errors.username
															? errors.username?.message
															: ""
													}
													fullWidth
													margin="dense"
												/>
											)}
										/>
									</div>
									<div>
										<p>Password</p>
										<Controller
											name="password"
											control={control}
											render={({ field }) => (
												<TextField
													size="small"
													{...field}
													type="password"
													variant="outlined"
													disabled={isFetching}
													error={!!errors.password}
													helperText={
														errors.password
															? errors.password?.message
															: ""
													}
													fullWidth
													margin="dense"
												/>
											)}
										/>
									</div>
									<div
										style={{
											display: "flex",
											width: "100%",
											justifyContent: "space-between",
										}}
									>
										{/* <div>
											<Typography
												variant="body2"
												style={{ marginTop: "12px" }}
											>
												Ingat Saya
											</Typography>
										</div>
										<Typography variant="body2" style={{ marginTop: "12px" }}>
											Lupa Password ?
										</Typography> */}
									</div>
									<Box
										sx={{
											py: 2,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Button
											color="primary"
											fullWidth
											size="small"
											type="submit"
											variant="contained"
											disabled={isFetching}
										>
											Login
										</Button>
										<Typography
											color="primary"
											variant="body2"
											onClick={() => router.push("/login/admin")}
											style={{
												fontWeight: "bold",
												marginTop: "12px",
												cursor: "pointer",
											}}
										>
											Login Sebagai Admin ?
										</Typography>
									</Box>
								</form>
							</div>
						</Grid>
						<Grid item xs={6}>
							{/* <img
								style={{ width: "100%", height: "100%" }}
								src={"/static/section1-login.svg"}
								alt="navbar-image"
							/> */}
							<div
								style={{
									position: "relative",
									height: "550px",
									width: "550px",
								}}
							>
								<Image
									src={"/static/section1-login.svg"}
									alt="navbar-image"
									layout="fill"
								/>
							</div>
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	return {
		props: {
			// csrfToken: await getCsrfToken(context),
			session: await getSession(context),
		},
	};
}
export default Login;
