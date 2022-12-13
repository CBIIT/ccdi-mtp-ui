import React, { useState } from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SummaryContainer from '../../components/Summary/SummaryContainer';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';

import sections from './sections';

const TARGET_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
  sections,
  'Target'
);
const TARGET_PROFILE_QUERY = gql`
  query TargetProfileQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      ...TargetProfileHeaderFragment
      ...TargetProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${TARGET_PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ ensgId, symbol }) {
  /*
   * For Any data coming through non GraphQl API, displaySettingsForExternal will keep tract the ids
   * of sections that has available data. This Array will be used under SectionOrderProvider to
   * determine if a section should be render or not.
   */
  const [displaySettingsForExternal, setDisplaySettingsForExternal] = useState([]);
  return (
    <PlatformApiProvider
      entity="target"
      query={TARGET_PROFILE_QUERY}
      variables={{ ensgId }}
    >
      <SectionOrderProvider
        sections={sections}
        displaySettingsForExternal={displaySettingsForExternal}
      >
        <ProfileHeader />
        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              id={ensgId}
              label={symbol}
              definition={definition}
              displaySettingsForExternal={displaySettingsForExternal}
              updateDisplaySettingsForExternal={setDisplaySettingsForExternal}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body
              key={definition.id}
              id={ensgId}
              label={symbol}
              definition={definition}
            />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;
