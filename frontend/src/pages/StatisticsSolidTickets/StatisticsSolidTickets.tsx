import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import SideBarForAdmin from '../../components/SideBar/SideBarForAdmin';
import { useGetSolidTicketsForEventsQuery } from '../../redux/event/eventsApi';
import { EventNameAndSoldTicketsCount } from '../../types/EventNameAndSoldTicketsCount';
import { chartOptions } from './constants';

const StatisticsSolidTickets: React.FC = () => {
  const { data, refetch } = useGetSolidTicketsForEventsQuery();

  useEffect(() => {
    refetch();
  }, []);

  const chartData = {
    labels:
      data?.map((event: EventNameAndSoldTicketsCount) => event.eventName) || [],
    datasets: [
      {
        label: 'Liczba sprzedanych biletów',
        data:
          data?.map(
            (event: EventNameAndSoldTicketsCount) => event.soldTicketsCount
          ) || [],
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 1)');

          return gradient;
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <SideBarForAdmin>
      <Box p={4}>
        <Heading as="h2" size="xl" mb={4}>
          Statystyki
        </Heading>
        {data ? (
          <Box bg="white" borderRadius="md" p={4}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        ) : (
          <Center minHeight="300px">
            <Spinner size="lg" />
          </Center>
        )}
      </Box>
    </SideBarForAdmin>
  );
};

export default StatisticsSolidTickets;
