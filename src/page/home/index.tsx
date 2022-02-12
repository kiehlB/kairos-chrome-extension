import AppLayout from '../../components/AppLayout';
import Header from '../../components/Base/Header';
import Card from '../../components/Card';
import { CountUp } from '../../components/Count';

function Home() {
  const Component = CountUp;

  return (
    <div className='w-full'>
      <AppLayout.MainNav>
        <Header />
      </AppLayout.MainNav>
      <AppLayout
        first={
          <AppLayout.First>
            <div className='w-full flex border-2 px-16'>
              {/* <Card
                className='analytics-view__card analytics-view__card--responsive analytics-view__card--sm'
                title={props.title}
                info={props.info}
                body={
                  <div>
                    <Component
                      start={0}
                      end={props.data}
                      decimals={props.decimals}
                      duration={TRANSITION_DELAY / 1000}
                      formattingFn={props.formattingFn}
                      formattingUnitFn={props.formattingUnitFn}
                      preserveValue={true}
                      redraw={true}
                    />
                  </div>
                }
              /> */}
            </div>
          </AppLayout.First>
        }
        second={<AppLayout.Second></AppLayout.Second>}
        third={<AppLayout.Third></AppLayout.Third>}
      />
    </div>
  );
}

export default Home;
