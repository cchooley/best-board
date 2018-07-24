import React from 'react'
import { Feed, Icon, Divider } from 'semantic-ui-react'

const Messages = (props) => {
    let allActivities = props.activitiesData.map(activity => {
        return (
            <Feed.Event>
                <Feed.Label>
                    <img src={activity.image} />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User>{activity.createdBy}</Feed.User> {activity.activity}
                        <br /><Feed.Date>{activity.openedOn.slice(0, 10)}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                        <Feed.Like>
                            <Icon name='like' />
                            4 Likes
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
                <Divider />
            </Feed.Event>
        )
    })
    return (
        <div className="messages">
            <Feed>
                <Divider horizontal>Recent Activity</Divider>
                {allActivities}
            </Feed>
        </div>
    )
}

export default Messages