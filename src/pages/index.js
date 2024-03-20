import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useEffect, useState } from "react";
import { getAllPlayer } from "src/view/ManagePlayer/ManagePlayerServices";
import { getAllMatch, getTopScorers } from "src/view/ManageCalendar/ManageCalendarServices";
import { getAllTeam, getRankingTeam } from "src/view/ManageTeam/ManageTeamServices";
import { getAllTournaments } from "src/view/Tournaments/TournamentsServices";
import { OverviewTeamRank } from "src/sections/overview/overview-team-rank";

const now = new Date();

const Page = () =>  {

  const [dataState, setDataState] = useState({});
    
  const convertDataScore = (value) => {
    return {
      id: value?.idplayer,
      image: value?.photo,
      name: value?.fullName,
    }
  }

  const getDetailReport = async () => {
    try {
      
    const numPlayer = await getAllPlayer();
    const numMatch = await getAllMatch();
    const numTeam = await getAllTeam();
    const numTournament = await getAllTournaments();
    const topScorers = await getTopScorers();
    const ranking = await getRankingTeam();

    setDataState((pre) => (
      {...pre,
       numPlayer: numPlayer?.data?.length,
       numMatch: numMatch?.data?.length,
       numTeam: numTeam?.data?.length,
       numTournament: numTournament?.data?.length,
       topScorers: topScorers?.data?.map(i => {
        return {
          ...convertDataScore(i?.player),
          goal: i?.goalsScored
        }
       }),
       ranking: ranking?.data
    }))
    } catch (error) {
      console.log(error) 
    }
  }

  useEffect(() => {
    getDetailReport();
  }, [])
  return <>
    <Head>
      <title>Overview | Team management system</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={dataState?.numTournament}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive
              sx={{ height: '100%' }}
              value={dataState?.numPlayer}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={dataState?.numMatch}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value={dataState?.numTeam}
            />
          </Grid>
          {/* <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid> */}
          
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestOrders sx={{ height: '100%', minHeight: 100 }} />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={4}
          >
            <OverviewLatestProducts
              title={"Top score goals"}
              products={dataState?.topScorers}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewTeamRank
              title="Team rankings"
              products={dataState?.ranking}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
