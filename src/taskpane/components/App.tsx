import * as React from "react";
import { Dropdown, PrimaryButton } from "@fluentui/react";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";
import { prefixDate } from "../../commands/commands";
import { APP_NAME, MODULES } from "../../settings";
/* global Office */
/* global require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "NumberedList",
          primaryText: "Choose module",
        },
        {
          icon: "Touch",
          primaryText: "Order meeting catering",
        },
        {
          icon: "EventAccepted",
          primaryText: "Meet and enjoy",
        },
      ],
    });
  }

  click = async () => {
    /**
     * Insert your Outlook code here
     */
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo-filled.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    const eventTime = Office.context.mailbox.item.start;
    const timeString = `${prefixDate(eventTime.getDate())}-${prefixDate(
      eventTime.getMonth()
    )}-${eventTime.getFullYear()}`;

    return (
      <div className="ms-welcome">
        <HeroList message={`Order food for your own meeting through ${APP_NAME}!`} items={this.state.listItems}>
          <p className="ms-font-l">Modify the sour c {timeString}</p>
          <Dropdown
            options={MODULES}
            placeholder="Choose a module to order for"
            label="Choose a module"
            style={{ width: "100%", marginBottom: "2rem" }}
          />
          <PrimaryButton className="ms-welcome__action" onClick={this.click}>
            Order now
          </PrimaryButton>
        </HeroList>
      </div>
    );
  }
}
