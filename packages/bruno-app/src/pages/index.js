import RequestTabs from 'components/RequestTabs';
import RequestTabPanel from 'components/RequestTabPanel';
import { useSelector } from 'react-redux';
import { Sidebar } from 'src/feature/sidebar';
import classes from './Main.module.scss';
import { Homepage } from 'src/feature/homepage';

export function Main() {
  const activeTabUid = useSelector((state) => state.tabs.activeTabUid);
  const showHomePage = useSelector((state) => state.app.showHomePage);

  return (
    <div className={classes.wrapper}>
      <Sidebar />
      <section>
        {showHomePage ? (
          <Homepage />
        ) : (
          <>
            <RequestTabs />
            <RequestTabPanel key={activeTabUid} />
          </>
        )}
      </section>
    </div>
  );
}
