import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from '../helpers/mockData';



describe('Tests Filters', () => {
  describe('test filter by name', () => {
    it('Write to filter by name', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
      render(<App />);
      await waitFor(() => {
        expect(screen.getByTestId('name-filter')).toBeInTheDocument();
        expect(screen.getAllByTestId('planet-name')).toBeInTheDocument();
        expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
        
        userEvent.type(screen.getByTestId('name-filter'), /tatooine/i);
        expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
        expect(screen.getAllByTestId('planet-name')[0]).toBeInTheDocument();
      });
    }); 
  })
  describe('Test filter by values', () => {
    it('test value filters', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
      await waitFor(() => {
        render(<App />)
      })
      
      const value = screen.getByTestId('value-filter');
      const column = screen.getByTestId('column-filter');
      const compare = screen.getByTestId('comparison-filter');
      const btnFilter = screen.getByTestId('button-filter');
      
      expect(value).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(compare).toBeInTheDocument();
      
      userEvent.selectOptions(column, 'diameter');
      expect(column).toHaveTextContent('diameter');
      
      userEvent.selectOptions(compare,'menor que');
      expect(compare).toHaveTextContent('menor que');
      
      userEvent.type(value, '10000');
      expect(value).toHaveValue(10000);
      
      expect(btnFilter).toBeInTheDocument();
      
      userEvent.click(btnFilter);
      
      const planeta = screen.getAllByTestId('planet-name');
      expect(planeta).toHaveLength(3);
      
      userEvent.selectOptions(column, 'rotation_period');
      userEvent.selectOptions(compare,'maior que');
      userEvent.type(value, '20');
      userEvent.click(btnFilter);
      
      const planeta2 = screen.getAllByTestId('planet-name');
      expect(planeta2).toHaveLength(2);
      
      
      userEvent.selectOptions(column, 'orbital_period');
      userEvent.selectOptions(compare,'igual a');
      userEvent.type(value, '549');
      userEvent.click(btnFilter);
      
      const planeta3 = screen.getAllByTestId('planet-name');
      expect(planeta3).toHaveLength(1);
      
      const rmvFilter = screen.getByTestId('remove-filter-2')
      expect(rmvFilter).toBeInTheDocument();
      userEvent.click(rmvFilter);

      const planeta4 = screen.getAllByTestId('planet-name');
      expect(planeta4).toHaveLength(2);
      
      const bntRemoveAllFilters = screen.getByTestId('button-remove-filters');
      expect(bntRemoveAllFilters).toBeInTheDocument();
      userEvent.click(bntRemoveAllFilters);
      
      const planeta5 = screen.getAllByTestId('planet-name');
      expect(planeta5).toHaveLength(10);
    })
  })
});