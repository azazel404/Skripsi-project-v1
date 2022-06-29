import React, { useState, useEffect } from "react"
import { Box, Button, Container, TextField, Typography, Grid, Paper, Divider, IconButton, InputAdornment, SvgIcon } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useRouter } from "next/router";
import Navbar from "../../layout/client/navbar";
import Footer from "~/src/layout/client/footer";
import Head from "next/head";
import { Loader } from "~/src/components/loader";
import CardRepository from "~/src/modules/e-repository/cardRepository";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MajorAPI from "~/src/api/MajorAPI";
import ERepositoryAPI from "~/src/api/ERepositoryAPI";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import Helpers from "~/src/helpers";
import { openErrorToast } from "~/src/actions";
import useStateWithRef from "../../helpers/useStateWithRef";
import EmptyState from "~/src/components/emptyState";
import { useDispatch } from "react-redux";

export const renderAmpersand = (params: any) => params.length === 0 ? "" : "&";

const ERepository = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const [latest, setLatest] = useState([{ label: "Paling baru", value: "ASC" }, { label: "Terlama", value: "DESC" }]);
    const [majorOptions, setMajorOptions] = useState([])
    const [search, setSearch] = useState("");
    const [year, setYear] = useState<String | null>(null);
    const [major, setMajor] = useState("");
    const [order, setOrder] = useState("");
    const [query, setQuery, queryRef] = useStateWithRef({
        page: 1,
        limit: 10,
        status: 1
    });
    const [isLoadMore, setIsLoadMore, isLoadMoreRef] = useStateWithRef(false);
    const [dataSource, setDataSource, dataSourceRef] = useStateWithRef({
        count: 0,
        hasMore: false,
        data: [],
    });


    useEffect(() => {
        MajorAPI.dataSource().then(res => {
            let option = res?.data.map((item: any) => {
                return { value: item.id, label: item.name }
            })
            setMajorOptions(option)
        })
    }, [])


    const onSearch = (params: any) => {
        let queryString = "";
        // const { search, year, major } = router.query;
        const { search, year, major, order } = params;

        if (search) {
            queryString += renderAmpersand(queryString) + `name=${search}`;
        }

        if (year) {
            queryString += renderAmpersand(queryString) + `year=${year}`;
        }

        if (major) {
            queryString +=
                renderAmpersand(major) + `major_id=${major}`;
        }
        if (order) {
            queryString +=
                renderAmpersand(order) + `order=${order}`;
        }

        router.push(`/e-repository?${queryString}`);
    };

    useEffect(() => {
        onSearch({ search, year, major, order })
    }, [search, year, major, order])


    useEffect(() => {
        setIsLoading(true);
        let payload = { ...query, search, year, major, order }
        ERepositoryAPI.get(payload)
            .then(res => {
                let dt = [];

                let existing = [...dataSource.data];
                dt = existing.concat(res?.data.data);

                setDataSource({
                    count: res?.data.count,
                    data: dt,
                    hasMore: res?.data.count > dt.length,
                });
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if (query.page === 1 || query.limit !== 0) {
            setIsLoadMore(true);

            let request = {
                ...query,
                ...router.query,
                // ...filter
            };

            ERepositoryAPI.get(request)
                .then((res) => {
                    let dt = [];

                    let existing = [...dataSource.data];
                    dt = existing.concat(res?.data.data);

                    setDataSource({
                        count: res?.data.count,
                        data: dt,
                        hasMore: res?.data.count > dt.length,
                    });
                })
                .catch((err) => {
                    let error = Helpers.ErrorHandler(err)
                    dispatch(openErrorToast(error.message));
                })
                .finally(() => {
                    setIsLoadMore(false);
                });
        }
    }, [search, year, major, order, query])

    const onScrollEnd = () => {
        let hasMore = dataSourceRef.current.hasMore;

        if (hasMore && !isLoadMoreRef.current) {
            let newQuery = { ...queryRef.current };
            newQuery.page = newQuery.page + 1;

            setQuery(newQuery);
        }
    };

    useEffect(() => {
        let initialHeight = document?.getElementById("erepository-section").clientHeight;

        console.log("initialHeight", initialHeight)
        const scrollCallBack = window.addEventListener("scroll", () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >
                initialHeight
            ) {
                if (onScrollEnd) onScrollEnd();
            }
        });

        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };
    }, []);



    return (
        <>
            <Head>
                <title>E-repository | Universitas Universal</title>
            </Head>
            <Navbar />
            <div style={{
            }}>
                <Container
                    style={{
                        height: "100vh",
                        marginTop: '64px',
                    }}
                >

                    <Grid
                        style={{
                            marginTop: '64px',

                        }}
                        container
                        spacing={4}
                    >
                        <Grid item xs={4}
                        >
                            <Paper
                                style={{
                                    minHeight: '500px',
                                    position: 'sticky',
                                    top: "calc(64px + 34px)",
                                }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 2
                                    }}
                                >
                                    <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>Filter pencarianmu</Typography>
                                    {!Helpers.IsEmptyObject(router.query) &&
                                        <IconButton size="small"
                                            onClick={() => {
                                                window.location = "/e-repository?";
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>}
                                </Box>
                                <Divider />
                                <div style={{ paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', marginBottom: '14px', marginTop: '14px' }}>
                                    <Typography style={{ fontSize: '14px' }}>Berdasarkan Judul:</Typography>
                                    <div style={{ marginTop: '14px', marginBottom: '14px' }}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    paddingRight: '4px'
                                                },

                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start" >
                                                        <SvgIcon color="action" fontSize="small">
                                                            <SearchIcon />
                                                        </SvgIcon>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onKeyPress={(event: any) => {
                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    setSearch(event.target.value);
                                                }
                                            }}
                                            onBlur={(event: any) => {
                                                setSearch(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <Divider />
                                </div>
                                <div style={{ paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', marginBottom: '14px', marginTop: '14px' }}>
                                    <Typography style={{ fontSize: '14px' }}>Berdasarkan Tanggal Terbit:</Typography>
                                    <div style={{ marginTop: '14px', marginBottom: '14px' }}>
                                        <DatePicker
                                            inputFormat="yyyy"
                                            views={['year']}
                                            value={year}
                                            onChange={(newValue: String | null) => {
                                                let format = moment(newValue).format("YYYY");
                                                setYear(format);
                                            }}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        style={{ width: '100%' }}
                                                        {...params}
                                                        size="small"
                                                    />
                                                )
                                            }}
                                        />
                                    </div>
                                    <Divider />
                                </div>
                                <div style={{ paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', marginBottom: '14px', marginTop: '14px' }}>
                                    <Typography style={{ fontSize: '14px' }}>Berdasarkan Program Studi:</Typography>
                                    <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onChange={(event) => setMajor(event.target.value)}
                                        >
                                            {majorOptions.map((item, index) => {
                                                return (
                                                    <FormControlLabel
                                                        key={index}
                                                        sx={{
                                                            '& .MuiFormControlLabel-root': {
                                                                marginLeft: '-6px'
                                                            },
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: "14px",
                                                            },
                                                        }}
                                                        value={item.value}
                                                        control={<Radio sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: "18px",
                                                            },
                                                            '& .MuiRadio-root': {
                                                                padding: "6px",
                                                            },
                                                        }} />}
                                                        label={item.label}
                                                    />
                                                )
                                            })}


                                        </RadioGroup>
                                    </div>
                                    <Divider />
                                </div>
                                <div style={{ paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', marginBottom: '14px', marginTop: '14px' }}>
                                    <Typography style={{ fontSize: '14px' }}>Berdasarkan Urutan:</Typography>
                                    <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onChange={(event) => setOrder(event.target.value)}
                                        >
                                            {latest.map((item, index) => {
                                                return (
                                                    <FormControlLabel
                                                        key={index}
                                                        sx={{
                                                            '& .MuiFormControlLabel-root': {
                                                                marginLeft: '-6px'
                                                            },
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: "14px",
                                                            },
                                                        }}
                                                        value={item.value}
                                                        control={<Radio sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: "18px",
                                                            },
                                                            '& .MuiRadio-root': {
                                                                padding: "6px",
                                                            },
                                                        }} />}
                                                        label={item.label}
                                                    />
                                                )
                                            })}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} style={{
                            marginBottom: "64px",
                            minHeight: "calc(100vh - 54px - 65px - 56px - 32px)"
                        }}>
                            <Grid container spacing={2} id="erepository-section">

                                {isLoading ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
                                        <Loader />
                                    </div>
                                    :
                                    dataSource.data.length > 0 ? dataSource.data.map((item: any, index: any) => {
                                        return (
                                            <Grid item xs={12} key={index}>
                                                <CardRepository data={item} />
                                            </Grid>
                                        )
                                    }) :
                                        <div style={{ height: '500px', width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <EmptyState text="No Data" />
                                        </div>
                                }
                                {isLoadMore && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '12px' }} >
                                        loading...

                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </div>
        </>
    )
}

export default ERepository;