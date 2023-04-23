import * as React from "react";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";
import { prefixDate } from "../../commands/commands";
import { APP_NAME } from "../../settings";
import Form from "./comps/Form";
/* global Office */

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

  render() {
    const { title, isOfficeInitialized } = this.props;
    // const [inputs, setInputs] = React.useState();

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
        <HeroList message={`Order food for the meeting through ${APP_NAME}!`} items={this.state.listItems}>
          <p>
            You are ordering for <b>{Office.context.mailbox.item.subject}</b>
          </p>
          <p>
            The date of the order is <b>{timeString}</b>
          </p>
          <Form />
        </HeroList>
      </div>
    );
  }
}
