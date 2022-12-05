import { Box } from '@material-ui/core';
import Link from '../../components/Link';
import { version } from '../../constants';

// CONTAINER
function VersionContainer({ children }) {
  return (
    <Box display="flex" mt={5} justifyContent="center" alignContent="center">
      {children}
    </Box>
  );
}

// LINK
function VersionLink() {
  return (
    <Box ml={1}>
      <Link external to={version.changeLogPage}>
        {version.frontend}
      </Link>
    </Box>
  );
}

// MAIN COMPONENT
function Version() {
  if (!version?.frontend) return null;

  return (
    <VersionContainer>
      Version: <VersionLink />
    </VersionContainer>
  );
}

export default Version;
