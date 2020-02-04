<template>
  <div class="home">
    <nav-aside />
    <main class="content">
      <div class="box">
        <header class="box-header">
          <span class="header-title">Результаты студентов</span>
          <div
            id="clear"
            class="btn"
          >
            Отчистить
          </div>
        </header>
        <div class="box-body">
          <div class="tbl">
            <div class="tbl-header">
              <table
                class="table"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Студент</th>
                    <th>Группа</th>
                    <th>Оценка</th>
                    <th>Оставшееся время</th>
                    <th>Дата</th>
                    <th>Название теста</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tbl-content">
              <table
                class="table"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tbody class="users-result" />
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '../components/NavAside';

export default {
  name: 'Home',
  components: {
    NavAside,
  },
};
</script>
