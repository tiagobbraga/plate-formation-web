import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Chip, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles({
  root: {
    border: 'none',
    borderBottom: '1px solid #0063AF',
    borderRadius: 0,
  },
  title: {
    fontSize: '1rem',
    fontWeight: 500,
    display: 'inline-block',
    marginRight: 10,
  },
});

export default function AssociatedCard({ name, able, pendencies, type_associated }) {
  const styles = useStyles();

  return (
    <Card className={styles.root} variant='outlined'>
      <CardContent>
        <Typography className={styles.title} color='textSecondary' gutterBottom>
          {name}
        </Typography>
        <Chip size='small' color={'primary'} label={type_associated.name} />
        {!able && <Chip size='small' color={'secondary'} label='NÃO APTO' />}
        {pendencies ? <ReactMarkdown>{pendencies}</ReactMarkdown> : <Typography>Sem recomendações</Typography>}
      </CardContent>
    </Card>
  );
}
