// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import { route } from 'laroute';
import * as React from 'react';
import { Option, OptionRenderProps, SelectOptions } from 'select-options';

interface RoomJson {
  id: number;
  name: string;
}

interface Props {
  currentRoom: RoomJson;
  rooms: RoomJson[];
}

export default class MultiplayerSelectOptions extends React.PureComponent<Props> {
  render() {
    const options = this.props.rooms.map((room) => ({
      id: room.id,
      text: room.name,
    }));

    const selected = {
      id: this.props.currentRoom.id,
      text: this.props.currentRoom.name,
    };

    return (
      <SelectOptions
        bn='spotlight-select-options'
        renderOption={this.renderOption}
        onChange={this.handleChange}
        options={options}
        selected={selected}
      />
    );
  }

  private handleChange = (option: Option<number>) => {
    osu.navigate(this.href(option.id));
  };

  private href(id: number | null) {
    return route('multiplayer.rooms.show', { room: id ?? 'latest' });
  }

  private renderOption = (props: OptionRenderProps<number>) => (
    <a
      className={props.cssClasses}
      href={this.href(props.option.id)}
      key={props.option.id ?? -1}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
}
